import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import connect from './db';
import routes from './routes';

const app = express();
app.disable('etag').disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
// files that exist
app.use(express.static(resolve(__dirname, '../distFrontend')));
// files that don't exist (i.e. react-router-dom routes)
app.use('/*', express.static(resolve(__dirname, '../distFrontend')));

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
