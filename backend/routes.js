export default (app, db) => {
  app.post('/api/seed/recipes', async (req, res) => {
    try {
      const newRecipe = await db.collection('recipes').insertOne(req.body);
      res.send(newRecipe.ops[0]);
    } catch (err) {
      res.status(400);
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/init', async (req, res) => {
    try {
      // get general
      const general = await db.collection('general').findOne({ meta: true });

      // get initial recipes
      const initialRecipes = await db
        .collection('recipes')
        .aggregate([ { $match: {} }, { $sort: { createdAt: -1 } }, { $limit: 20 } ])
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
      // get general
      const general = await db.collection('general').findOne({ meta: true });

      // get initial recipes
      const initialRecipes = await db
        .collection('recipes')
        .aggregate([ { $match: {} }, { $sort: { createdAt: -1 } }, { $limit: 20 } ])
        .toArray();

      // get current recipe
      const currentRecipe = await db.collection('recipes').findOne({ slug: req.params.slug });

      // send it
      res.send({ general, initialRecipes, currentRecipe });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });

  app.get('/api/top-five-recipe/:slug', async (req, res) => {
    try {
      // get top five recipe
      const currentRecipe = await db.collection('recipes').findOne({ slug: req.params.slug });

      // send it
      res.send({ currentRecipe });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });
};
