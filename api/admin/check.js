import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(200).json({ isAdmin: false });

  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user) return res.status(200).json({ isAdmin: false });

  const { data } = await supabase
    .from('admins')
    .select('role')
    .eq('email', user.email)
    .single();

  if (data) {
    return res.status(200).json({ isAdmin: true, role: data.role });
  }

  return res.status(200).json({ isAdmin: false });
}
