import { MongoClient } from 'mongodb';

const URI = process.env.NODE_ENV === 'production' ? process.env.PROD_URI : process.env.DEV_URI;
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('meal-tada');
  } catch (err) {
    console.log(err.message, err.stack);
  }
};
