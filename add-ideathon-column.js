import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRES_URL.replace('?sslmode=require&supa=base-pooler.x', ''),
  ssl: { rejectUnauthorized: false }
});

async function addIdeathonColumn() {
  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    const query = `
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS ideathon_opt_in BOOLEAN DEFAULT false;
    `;

    await client.query(query);
    console.log("Added 'ideathon_opt_in' column successfully.");
  } catch (error) {
    console.error("Database migration error:", error);
  } finally {
    await client.end();
  }
}

addIdeathonColumn();
