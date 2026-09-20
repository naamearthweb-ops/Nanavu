import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  try {
    // 1. Verify user is in admins table
    const { data: adminData } = await supabase
      .from('admins')
      .select('*')
      .eq('email', user.email)
      .single();

    if (!adminData) {
      return res.status(403).json({ message: 'Forbidden. Admin access required.' });
    }

    // 2. Fetch all registrations with their team name
    const { data: registrations, error: dbError } = await supabase
      .from('registrations')
      .select('*, teams(name)')
      .order('created_at', { ascending: false });

    if (dbError) {
      return res.status(500).json({ message: 'Database error', error: dbError.message });
    }

    res.status(200).json({ users: registrations, adminRole: adminData.role });
  } catch (error) {
    console.error('Admin Users Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
