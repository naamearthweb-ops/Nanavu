import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
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
    // 1. Verify user is SUPER_ADMIN
    const { data: adminData } = await supabase
      .from('admins')
      .select('role')
      .eq('email', user.email)
      .single();

    if (!adminData || adminData.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ message: 'Forbidden. Super Admin access required.' });
    }

    if (req.method === 'GET') {
      // Fetch all admins
      const { data: admins, error: dbError } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      return res.status(200).json({ admins });
    }

    if (req.method === 'POST') {
      // Add a sub-admin
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: 'Email required' });

      // First create them in auth if they don't exist? 
      // If we don't, they won't be able to log in. We'll generate a random password.
      const tempPassword = 'Admin@' + Math.random().toString(36).slice(-8) + '!';
      const { error: createError } = await supabase.auth.admin.createUser({
        email: email,
        password: tempPassword,
        email_confirm: true,
      });
      
      // Ignore "already registered" error, just means they can use their existing pass
      if (createError && !createError.message.includes('already registered')) {
        return res.status(400).json({ message: createError.message });
      }

      const { error: dbError } = await supabase
        .from('admins')
        .insert([{ email: email, role: 'ADMIN' }]);

      if (dbError) {
        if (dbError.code === '23505') return res.status(400).json({ message: 'Admin already exists' });
        throw dbError;
      }

      return res.status(200).json({ 
        message: 'Admin added successfully.', 
        tempPassword: createError?.message?.includes('already registered') ? 'User already had an account. They can use their existing password.' : tempPassword 
      });
    }

    if (req.method === 'DELETE') {
      // Remove a sub-admin
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: 'Email required' });

      if (email === user.email) {
        return res.status(400).json({ message: 'You cannot delete yourself.' });
      }

      const { error: dbError } = await supabase
        .from('admins')
        .delete()
        .eq('email', email);

      if (dbError) throw dbError;

      return res.status(200).json({ message: 'Admin removed successfully.' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Admins API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
