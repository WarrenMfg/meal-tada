/* eslint-disable no-console */

import { getGeneralAndIntialRecipes } from './utils';
import { Worker } from 'worker_threads';
import { resolve } from 'path';
import Queue from './Queue';

const file =
  process.env.NODE_ENV === 'production'
    ? 'imageScramble.js'
    : resolve(__dirname, 'imageScramble.js');

const workerQueue = new Queue();
new Array(4)
  .fill(null)
  .forEach(() =>
    workerQueue.enqueue(
      new Worker(process.cwd() + '/distBackend/imageScramble.js')
    )
  );
const requestQueue = new Queue();

function handleImageScramble(res, slug, worker) {
  worker.postMessage(slug);

  // when worker posts message to parent.
  // when 'message' is triggered in worker, this cb is removed then invoked
  worker.once('message', result => {
    if (result.uploaded) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

    // if requests are waiting, reuse the current worker
    // to handle the queued request
    if (requestQueue.size() > 0) {
      requestQueue.dequeue()(worker);
    }
    // otherwise, add the worker to pool if no requests are queued
    else {
      workerQueue.enqueue(worker);
    }
  });
}

export default (app, db) => {
  app.get('/api/init', async (req, res) => {
    try {
      // get general and initial recipes
      const { general, initialRecipes } = await getGeneralAndIntialRecipes(db);

      // send it
      res.send({ general, initialRecipes });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get(
    ['/api/init-and-current-recipe/:slug', '/api/current-recipe/:slug'],
    async (req, res) => {
      try {
        // sanitize
        let { slug } = req.params;
        slug = /^\$/.test(slug) ? '' : slug;

        let general, initialRecipes;
        if (req.originalUrl.includes('init-and-current-recipe')) {
          // get general and initial recipes
          const generalAndInitialRecipes = await getGeneralAndIntialRecipes(db);
          general = generalAndInitialRecipes.general;
          initialRecipes = generalAndInitialRecipes.initialRecipes;
        }

        const increment = process.env.NODE_ENV === 'production' ? 1 : 0;

        // get current recipe
        const { value: currentRecipe } = await db
          .collection('recipes')
          .findOneAndUpdate(
            { slug },
            { $inc: { views: increment } },
            { returnOriginal: false }
          );

        // send it
        if (currentRecipe?.isPublished && general && initialRecipes) {
          res.send({ general, initialRecipes, currentRecipe });
        } else if (currentRecipe?.isPublished) {
          res.send({ currentRecipe });
        } else {
          res.status(404).send({ route: '/' });
        }
      } catch (err) {
        res.status(400).json({ message: 'Bad request' });
        console.log(err.message, err.stack);
      }
    }
  );

  app.get('/api/more-recipes/:lastRecipeCreatedAt', async (req, res) => {
    try {
      // sanitize
      let { lastRecipeCreatedAt } = req.params;
      lastRecipeCreatedAt = /^\$/.test(lastRecipeCreatedAt)
        ? ''
        : Number(lastRecipeCreatedAt);

      // get more recipes
      const moreRecipes = await db
        .collection('recipes')
        .aggregate([
          {
            $match: {
              isPublished: true,
              createdAt: { $lt: lastRecipeCreatedAt }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: parseInt(process.env.RECIPE_BATCH_LIMIT, 10) }
        ])
        .toArray();

      // send it
      res.send(moreRecipes);
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/search?', async (req, res) => {
    try {
      let { phrase, exact, categories, time, servings } = req.query;

      // sanitize phrase
      phrase = /^\$/.test(phrase) ? '' : phrase;
      // sanitize exact
      exact = /^\$/.test(exact) ? '' : exact;
      // sanitize categories
      if (Array.isArray(categories)) {
        categories = categories.filter(cat => /^\$/.test(cat) === false);
      } else {
        categories = [];
      }
      // sanitize time and servings
      const timeAndServings = { time, servings };
      Object.keys(timeAndServings).forEach(key => {
        // if it's an array, ensure contents are numbers
        if (Array.isArray(timeAndServings[key])) {
          timeAndServings[key] = timeAndServings[key].map(value => {
            const num = Number(value);
            if (!Number.isNaN(num)) {
              return num;
            }
            return 0;
          });
          // otherwise, just make an empty array
        } else {
          timeAndServings[key] = [];
        }
      });

      // define aggregation
      const agg = [];

      // agg phrase
      if (phrase) {
        phrase =
          exact === 'true' ? `\"${phrase}\"` : phrase; /* eslint-disable-line */
        agg.push({ $match: { isPublished: true, $text: { $search: phrase } } });
        agg.push({ $sort: { score: { $meta: 'textScore' } } });
      }

      // agg categories
      if (phrase && categories.length) {
        agg.push({ $match: { categories: { $in: categories } } });
      } else if (categories.length) {
        agg.push({ $match: { categories: { $in: categories } } });
        agg.push({ $sort: { createdAt: -1 } });
      }

      // agg time
      if (timeAndServings.time.length) {
        const { time } = timeAndServings;
        agg.push({
          $match: {
            $and: [
              {
                $expr: {
                  $gte: [
                    {
                      $add: ['$time.prep', '$time.cook']
                    },
                    time[0]
                  ]
                }
              },
              {
                $expr: {
                  $lte: [
                    {
                      $add: ['$time.prep', '$time.cook']
                    },
                    time[1]
                  ]
                }
              }
            ]
          }
        });
      }

      // agg servings
      if (timeAndServings.servings.length) {
        const { servings } = timeAndServings;
        agg.push({
          $match: {
            $or: [
              {
                $and: [
                  { 'servings.0': { $gte: servings[0] } },
                  { 'servings.0': { $lte: servings[1] } }
                ]
              },
              {
                $and: [
                  { 'servings.1': { $gte: servings[0] } },
                  { 'servings.1': { $lte: servings[1] } }
                ]
              }
            ]
          }
        });
      }

      // search it
      const searchResults = await db
        .collection('recipes')
        .aggregate(agg)
        .toArray();

      // send it
      res.send(searchResults);
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/image-scramble/:slug', (req, res) => {
    try {
      const { slug } = req.params;

      if (workerQueue.size() > 0) {
        handleImageScramble(res, slug, workerQueue.dequeue());
      } else {
        // queue requests when no worker is available
        // the function is waiting for a worker to be assigned
        requestQueue.enqueue(worker => handleImageScramble(res, slug, worker));
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  /**
   * start seed
   */

  app.post('/api/seed/general', async (req, res) => {
    try {
      const general = await db.collection('general').insertOne(req.body);
      res.send(general.ops[0]);
    } catch (err) {
      res.status(400);
      console.log(err.message, err.stack);
    }
  });

  app.post('/api/seed/recipes', async (req, res) => {
    try {
      const newRecipe = await db.collection('recipes').insertOne(req.body);
      res.send(newRecipe.ops[0]);
    } catch (err) {
      res.status(400);
      console.log(err.message, err.stack);
    }
  });

  /**
   * end seed
   */
};
