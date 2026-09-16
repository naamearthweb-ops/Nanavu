import pkg from 'pg';
const { Client } = pkg;
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.POSTGRES_URL.replace('?sslmode=require&supa=base-pooler.x', ''),
  ssl: { rejectUnauthorized: false }
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL.");

    // 1. Create Admins Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'ADMIN',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );
    `);
    console.log("Admins table created/verified.");

    // 2. Create Super Admin in Supabase Auth
    const superAdminEmail = 'naamearthweb@gmail.com';
    const tempPassword = 'NanavuSuperAdmin2026!'; // The user should change this later

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: superAdminEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name: 'Nanavu Super Admin' }
    });

    if (authError && !authError.message.includes('already registered')) {
      console.error("Failed to create super admin auth user:", authError);
    } else {
      console.log(`Auth user for ${superAdminEmail} ensured.`);
    }

    // 3. Insert into admins table
    await client.query(`
      INSERT INTO admins (email, role) 
      VALUES ($1, 'SUPER_ADMIN') 
      ON CONFLICT (email) DO UPDATE SET role = 'SUPER_ADMIN';
    `, [superAdminEmail]);
    
    console.log(`Successfully added ${superAdminEmail} as SUPER_ADMIN.`);
    console.log(`If this was a new account, the temporary password is: ${tempPassword}`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

run();
