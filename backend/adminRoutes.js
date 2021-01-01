/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const isAuthed = (req, res, next) => {
  try {
    const isAdmin =
      process.env.ADMIN_1.includes(req.user?.user) ||
      process.env.ADMIN_2.includes(req.user?.user);

    if (req.user && isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized.' });
    }
  } catch (err) {
    res.status(500);
    console.log(err.message, err.stack);
  }
};

export default (app, db) => {
  app.post('/api/login', (req, res) => {
    try {
      const { credentials } = req.body;
      if (
        credentials === process.env.ADMIN_1 ||
        credentials === process.env.ADMIN_2
      ) {
        const user = credentials.split(' ')[0];
        const payload = {
          user
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: process.env.EXPIRES_IN },
          (err, token) => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Could not log in user.' });
            } else {
              return res.send({ token: `MTA ${token}` });
            }
          }
        );
      } else {
        res.redirect('/');
      }
    } catch (err) {
      res.status(500);
      console.log(err.message, err.stack);
    }
  });

  app.post(
    ['/api/upsertRecipe', '/api/upsertIngredient'],
    isAuthed,
    async (req, res) => {
      try {
        const collection =
          req.originalUrl === '/api/upsertRecipe'
            ? 'recipes'
            : req.originalUrl === '/api/upsertIngredient'
            ? 'ingredients'
            : '';
        const { _id, ...body } = req.body;

        const now = Date.now();
        if (!body.createdAt) body.createdAt = now;
        body.updatedAt = now;

        const upserted = await db
          .collection(collection)
          .findOneAndReplace({ _id: ObjectId(_id) }, body, {
            upsert: true,
            returnOriginal: false
          });
        res.send(upserted.value);
      } catch (err) {
        res.status(500);
        console.log(err.message, err.stack);
      }
    }
  );

  app.get(
    ['/api/admin/search-recipes?', '/api/admin/search-ingredients?'],
    isAuthed,
    async (req, res) => {
      try {
        let collection = req.originalUrl.startsWith(
          '/api/admin/search-recipes?'
        )
          ? 'recipes'
          : req.originalUrl.startsWith('/api/admin/search-ingredients?')
          ? 'ingredients'
          : '';
        let { phrase } = req.query;

        // sanitize phrase
        phrase = /^\$/.test(phrase) ? '' : phrase;

        // define aggregation
        const agg = [];

        // agg phrase
        agg.push({ $match: { $text: { $search: phrase } } });
        agg.push({ $sort: { score: { $meta: 'textScore' } } });

        // search it
        const searchResults = await db
          .collection(collection)
          .aggregate(agg)
          .toArray();

        // send it
        res.send(searchResults);
      } catch (err) {
        res.status(400).json({ message: 'Bad request' });
        console.log(err.message, err.stack);
      }
    }
  );
};
