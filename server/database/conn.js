import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  mongoose.set('strictQuery', true);
  const db = await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
  return db;
}

export default connect;