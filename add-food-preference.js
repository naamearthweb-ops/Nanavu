import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRES_URL.replace('?sslmode=require&supa=base-pooler.x', ''),
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  try {
    await client.connect();
    await client.query("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS food_preference TEXT;");
    console.log("Added food_preference");
  } catch (error) {
    console.error("Database setup error:", error);
  } finally {
    await client.end();
  }
}
setup();
