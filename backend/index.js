import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import connect from './db';
import routes from './routes';

const app = express();
app.disable('etag').disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
// for static files and virtual paths
app.use(
  [ '/recipes', '/about', `/search\*`, '/search', `/recipe/\*`, '/' ],
  express.static(resolve(__dirname, '../distFrontend'))
);

(async () => {
  try {
    // connect mongodb
    const db = await connect();

    // setup routes
    routes(app, db);

    // connect express
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
  } catch (err) {
    console.log(err.message, err.stack);
  }
})();
