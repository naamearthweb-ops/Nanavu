import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, update database to PAID
      const { error } = await supabase
        .from('registrations')
        .update({
          payment_status: 'PAID',
          razorpay_payment_id: razorpay_payment_id
        })
        .eq('razorpay_order_id', razorpay_order_id);

      if (error) {
        console.error('Supabase Update Error:', error);
        return res.status(500).json({ message: 'Payment verified but failed to save registration status.' });
      }

      res.status(200).json({ message: 'Payment verified and status updated successfully' });
    } else {
      res.status(400).json({ message: 'Invalid Signature' });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
