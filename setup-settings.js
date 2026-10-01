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
    console.log("Connected to Supabase PostgreSQL.");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;

    await client.query(createTableQuery);
    console.log("Table 'settings' ensured.");

    await client.query(`
      INSERT INTO settings (key, value) VALUES ('registration_closed', 'false') ON CONFLICT (key) DO NOTHING;
    `);
    console.log("Initial settings inserted.");
    
  } catch (error) {
    console.error("Database setup error:", error);
  } finally {
    await client.end();
  }
}

setup();
