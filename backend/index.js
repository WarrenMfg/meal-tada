/* eslint-disable no-console */

import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import connect from './db';
import routes from './routes';
import adminRoutes from './adminRoutes';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

const app = express();
app.disable('etag').disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// verify JWT
app.use((req, res, next) => {
  try {
    if (req.headers?.authorization?.split(' ')[0] === 'MTA') {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
          req.expiredUser = jwtDecode(token);
          req.user = undefined;
        } else {
          // for isAuthed middleware
          req.user = decode;
        }
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

// for direct navigation
app.use(
  [
    '/recipe/:recipe',
    '/recipes',
    '/about',
    `/search\*` /* eslint-disable-line */,
    '/search',
    '/admin'
  ],
  (req, res) => {
    try {
      // res.set({ 'Cache-Control': 'public, max-age=604800, immutable' });
      res.sendFile(resolve(__dirname, '../distFrontend/index.html'));
    } catch (err) {
      res.sendStatus(404).json({ message: 'Not found' });
      console.log(err.message, err.stack);
    }
  }
);

(async () => {
  try {
    // connect mongodb
    const db = await connect();

    // setup public routes
    routes(app, db);

    // setup admin routes
    adminRoutes(app, db);

    // redirect route for 404s
    app.get(
      '*',
      (req, res, next) => {
        // res.set({ 'Cache-Control': 'public, max-age=604800, immutable' });
        next();
      },
      express.static(resolve(__dirname, '../distFrontend')),
      (req, res) => {
        try {
          // res.set({ 'Cache-Control': 'public, max-age=604800, immutable' });
          res.redirect('/');
        } catch (err) {
          console.log(err.message, err.stack);
          res.sendStatus(404).json({ message: 'Not found' });
        }
      }
    );

    // connect express
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err.message, err.stack);
  }
})();
