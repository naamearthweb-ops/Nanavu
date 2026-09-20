import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.POSTGRES_URL.replace('?sslmode=require&supa=base-pooler.x', ''),
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL.");

    // 1. Create Teams Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );
    `);
    console.log("Teams table created/verified.");

    // 2. Add team_id to registrations if not exists
    await client.query(`
      ALTER TABLE registrations
      ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES teams(id) ON DELETE SET NULL;
    `);
    console.log("Added team_id column to registrations.");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

run();
