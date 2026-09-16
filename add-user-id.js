import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRES_URL.replace('?sslmode=require&supa=base-pooler.x', ''),
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    const query = `
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
    `;
    await client.query(query);
    console.log("Added user_id column to registrations table.");
    
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await client.end();
  }
}

migrate();
