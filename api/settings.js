import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use anon key because this is a public endpoint
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data: settings, error } = await supabase
      .from('settings')
      .select('*');

    if (error) {
      throw error;
    }

    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });

    res.status(200).json(settingsObj);
  } catch (error) {
    console.error('Fetch Settings Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
