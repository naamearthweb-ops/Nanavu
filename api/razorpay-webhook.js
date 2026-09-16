import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

const getRawBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', reject);
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  if (!webhookSecret || !signature) {
    return res.status(400).json({ message: 'Missing secret or signature' });
  }

  try {
    const rawBody = await getRawBody(req);

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid Webhook Signature' });
    }

    const parsedBody = JSON.parse(rawBody);
    const event = parsedBody.event;

    if (event === 'payment.captured') {
      const paymentEntity = parsedBody.payload.payment.entity;
      const order_id = paymentEntity.order_id;
      const payment_id = paymentEntity.id;

      // The fail-safe: Update the DB if it is still PENDING
      const { error } = await supabase
        .from('registrations')
        .update({
          payment_status: 'PAID',
          razorpay_payment_id: payment_id
        })
        .eq('razorpay_order_id', order_id);

      if (error) {
        console.error('Webhook Supabase Error:', error);
        return res.status(500).json({ message: 'Failed to update database' });
      }

      console.log(`Webhook successfully processed payment ${payment_id} for order ${order_id}`);
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
