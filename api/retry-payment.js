import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// We use service key to verify JWT and update DB securely
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

  const { userType = 'student', optIdeathon = false, currency = 'INR', receipt } = req.body; 

  try {
    // 1. Verify user is actually PENDING
    const { data: regData } = await supabase
      .from('registrations')
      .select('payment_status, amount_paid_inr')
      .eq('user_id', user.id)
      .single();

    if (!regData) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (regData.payment_status === 'PAID') {
      return res.status(400).json({ message: 'You have already paid.' });
    }

    let calculatedAmount = userType === 'student' ? 300 : 600;
    if (optIdeathon) {
      calculatedAmount += 150;
    }
    const amount = calculatedAmount * 100;
    
    // 2. Create Razorpay Order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount.toString(),
      currency,
      receipt: receipt || `retry_rcpt_${Date.now()}`,
    };

    let order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ message: 'Error creating order' });
    }

    // 3. Update PENDING Registration record with new order ID
    const { error: dbError } = await supabase
      .from('registrations')
      .update({
        razorpay_order_id: order.id,
        amount_paid_inr: calculatedAmount,
        ideathon_opt_in: optIdeathon,
        payment_status: 'PENDING'
      })
      .eq('user_id', user.id);

    if (dbError) {
      return res.status(500).json({ message: 'Database error', error: dbError.message });
    }

    // Return the order to the frontend
    res.status(200).json(order);
  } catch (error) {
    console.error('Retry Payment Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
