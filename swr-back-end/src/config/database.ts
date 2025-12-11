import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'vinivici';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

let db: Db;

export async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI as string);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB (Database: ${DB_NAME})`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

export function getDB(): Db {
  return db;
}