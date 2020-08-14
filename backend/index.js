/* eslint-disable no-console */

import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import connect from './db';
import routes from './routes';

const app = express();
app.disable('etag').disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for direct navigation
app.use(
  [
    '/recipe/:recipe',
    '/recipes',
    '/about',
    `/search\*` /* eslint-disable-line */,
    '/search'
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
// everything else
app.use(
  '/',
  (req, res, next) => {
    // res.set({ 'Cache-Control': 'public, max-age=604800, immutable' });
    next();
  },
  express.static(resolve(__dirname, '../distFrontend'))
);

(async () => {
  try {
    // connect mongodb
    const db = await connect();

    // setup routes
    routes(app, db);

    // connect express
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err.message, err.stack);
  }
})();
