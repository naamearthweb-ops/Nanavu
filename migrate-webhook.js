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

    // 1. Add payment_status column
    await client.query(`
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'PENDING'
    `);
    console.log("Added payment_status column.");

    // Update existing rows to PAID (since they were created under the old system where only paid users were registered)
    await client.query(`
      UPDATE registrations SET payment_status = 'PAID' WHERE payment_status = 'PENDING'
    `);
    
    // 2. Make razorpay_payment_id nullable
    await client.query(`
      ALTER TABLE registrations 
      ALTER COLUMN razorpay_payment_id DROP NOT NULL
    `);
    console.log("Made razorpay_payment_id NULLable.");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

run();
