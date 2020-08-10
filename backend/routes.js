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

  app.get('/api/home', async (req, res) => {
    try {
      // get general
      const general = await db.collection('general').findOne({ meta: true });

      // get latest recipes
      const latestRecipes = await db
        .collection('recipes')
        .aggregate([ { $match: {} }, { $sort: { createdAt: -1 } }, { $limit: 20 } ])
        .toArray();

      // send it
      res.send({ general, latestRecipes });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
      console.log(err.message, err.stack);
    }
  });
};
