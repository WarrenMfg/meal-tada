export default (app, db) => {
  app.get('/api/hello-world', async (req, res) => {
    try {
      res.send({ hello: 'world' });
    } catch (err) {
      console.log(err.message, err.stack);
    }
  });
};
