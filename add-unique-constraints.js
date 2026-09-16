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

    // Delete duplicates for testing (rows without user_id)
    await client.query(`DELETE FROM registrations WHERE user_id IS NULL`);

    // Add unique constraints
    await client.query(`ALTER TABLE registrations ADD CONSTRAINT unique_email UNIQUE (email)`);
    await client.query(`ALTER TABLE registrations ADD CONSTRAINT unique_phone UNIQUE (phone)`);

    console.log("Unique constraints added successfully for email and phone.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

run();
