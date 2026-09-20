import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use anon key because this is a public endpoint used during registration
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data: teams, error } = await supabase
      .from('teams')
      .select('name')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    res.status(200).json({ teams: teams.map(t => t.name) });
  } catch (error) {
    console.error('Fetch Teams Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
