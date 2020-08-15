/* eslint-disable no-console */

export default (app, db) => {
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

  /////////////////////////// END SEED ///////////////////////////

  app.get('/api/init', async (req, res) => {
    try {
      // get general
      const general = await db.collection('general').findOne({ meta: true });

      // get initial recipes
      const initialRecipes = await db
        .collection('recipes')
        .aggregate([
          { $match: {} },
          { $sort: { createdAt: -1 } },
          { $limit: 20 }
        ])
        .toArray();

      // send it
      res.send({ general, initialRecipes });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/init-and-current-recipe/:slug', async (req, res) => {
    try {
      // sanitize
      let { slug } = req.params;
      slug = /^\$/.test(slug) ? '' : slug;

      // get general
      const general = await db.collection('general').findOne({ meta: true });

      // get initial recipes
      const initialRecipes = await db
        .collection('recipes')
        .aggregate([
          { $match: {} },
          { $sort: { createdAt: -1 } },
          { $limit: 20 }
        ])
        .toArray();

      // get current recipe
      const currentRecipe = await db.collection('recipes').findOne({ slug });

      // send it
      res.send({ general, initialRecipes, currentRecipe });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

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
          { $match: { createdAt: { $lt: lastRecipeCreatedAt } } },
          { $sort: { createdAt: -1 } },
          { $limit: 20 }
        ])
        .toArray();

      // send it
      res.send(moreRecipes);
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/top-five-recipe/:slug', async (req, res) => {
    try {
      // sanitize
      let { slug } = req.params;
      slug = /^\$/.test(slug) ? '' : slug;

      // get top five recipe
      const currentRecipe = await db.collection('recipes').findOne({ slug });

      // send it
      res.send(currentRecipe);
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
        agg.push({ $match: { $text: { $search: phrase } } });
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
};

/*

// search agg for prep and cook times
['prep', 'cook'].forEach(key => {
  if (timeAndServings[key].length) {
    const nested = `time.${key}`;
    agg.push({
      $match: {
        $and: [
          {
            [nested]: { $gte: timeAndServings[key][0] }
          },
          {
            [nested]: { $lte: timeAndServings[key][1] }
          }
        ]
      }
    });
  }
});

*/
