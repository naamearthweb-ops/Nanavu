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

    // Create the registrations table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        organization TEXT NOT NULL,
        branch TEXT NOT NULL,
        year_of_study TEXT NOT NULL,
        razorpay_order_id TEXT NOT NULL,
        razorpay_payment_id TEXT NOT NULL,
        amount_paid_inr INTEGER NOT NULL
      );
    `;

    await client.query(createTableQuery);
    console.log("Table 'registrations' ensured.");
    
  } catch (error) {
    console.error("Database setup error:", error);
  } finally {
    await client.end();
  }
}

setup();
