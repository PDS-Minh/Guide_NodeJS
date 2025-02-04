// db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Setting MongoDB and URL
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUrl = `mongodb://${dbHost}:${dbPort}/`;

// Create MongoDB Client
const client = new MongoClient(dbUrl);

// Database Connection Methon
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Success to MongoDB Connection!");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("❌ Failed to MongoDB Connection:", err);
    throw err;
  }
}

// Database Connection Close Methon
export async function closeDB() {
  try {
    await client.close();
    console.log("🔒 Close MongoDB Connection.");
  } catch (err) {
    console.error("❌ Failed to Close MongoDB Connection:", err);
  }
}
