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
      let searchResults;

      let { phrase } = req.query;
      let { exact, categories } = req.query;

      // sanitize
      phrase = /^\$/.test(phrase) ? '' : phrase;
      exact = /^\$/.test(exact) ? '' : exact;
      if (Array.isArray(categories)) {
        categories = categories.filter(cat => /^\$/.test(cat) === false);
      }

      if (phrase) {
        phrase =
          exact === 'true' ? `\"${phrase}\"` : phrase; /* eslint-disable-line */

        const agg = [
          { $match: { $text: { $search: phrase } } },
          { $sort: { score: { $meta: 'textScore' } } }
        ];

        if (categories) {
          const filter = {
            $match: { categories: { $in: categories } }
          };
          agg.push(filter);
        }

        searchResults = await db.collection('recipes').aggregate(agg).toArray();
      } else {
        searchResults = await db
          .collection('recipes')
          .aggregate([
            { $match: { categories: { $in: categories } } },
            { $sort: { createdAt: -1 } }
          ])
          .toArray();
      }

      res.send(searchResults);
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });
};
