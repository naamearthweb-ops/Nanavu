import Razorpay from 'razorpay';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { 
    userType = 'student', optIdeathon = false, currency = 'INR', receipt, 
    email, password, full_name, phone, whatsapp, organization, branch, year_of_study 
  } = req.body;

  let calculatedAmount = userType === 'student' ? 300 : 600;
  if (optIdeathon) {
    calculatedAmount += 150;
  }
  const amount = calculatedAmount * 100; // in paise

  if (amount < 100) {
    return res.status(400).json({ message: 'Amount must be at least 100 paise' });
  }

  try {
    let userId;
    let isExistingPending = false;

    // 1. Create or Authenticate User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { full_name }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        // Attempt to sign in to verify password using a non-persistent anonymous client
        const anonClient = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY, {
          auth: { persistSession: false, autoRefreshToken: false }
        });
        const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (signInError) {
          return res.status(401).json({ message: "An account with this email exists. Please use the correct password or sign in instead." });
        }

        userId = signInData.user.id;
        
        // Check registration status
        const { data: regData } = await supabase
          .from('registrations')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (regData) {
          if (regData.payment_status === 'PAID') {
            return res.status(400).json({ message: "You are already registered and paid. Please sign in." });
          } else {
            isExistingPending = true;
          }
        }
      } else {
        return res.status(400).json({ message: authError.message });
      }
    } else {
      userId = authData.user.id;
    }

    let order;
    const bypass_payment = req.body.bypass_payment;

    if (bypass_payment) {
      order = { id: `bypass_${Date.now()}`, amount, currency };
    } else {
      // 2. Create Razorpay Order
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: amount.toString(), // amount in smallest currency unit
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
      };

      order = await razorpay.orders.create(options);
    }
    
    if (!order) {
      if (!isExistingPending) await supabase.auth.admin.deleteUser(userId);
      return res.status(500).json({ message: 'Error creating order' });
    }

    const payment_status = bypass_payment ? 'PAID' : 'PENDING';

    // 3. Insert or Update Registration record
    if (isExistingPending) {
      const { error: dbError } = await supabase
        .from('registrations')
        .update({
          razorpay_order_id: order.id,
          amount_paid_inr: calculatedAmount,
          payment_status: payment_status,
          ideathon_opt_in: optIdeathon
        })
        .eq('user_id', userId);

      if (dbError) {
        return res.status(500).json({ message: 'Database error', error: dbError.message });
      }
    } else {
      const { error: dbError } = await supabase
        .from('registrations')
        .insert([
          {
            user_id: userId,
            full_name,
            email,
            phone,
            whatsapp,
            organization,
            branch,
            year_of_study,
            razorpay_order_id: order.id,
            amount_paid_inr: calculatedAmount,
            payment_status: payment_status,
            ideathon_opt_in: optIdeathon
          }
        ]);

      if (dbError) {
        // Rollback Auth user if DB insert fails
        await supabase.auth.admin.deleteUser(userId);
        return res.status(500).json({ message: 'Database error (Possible duplicate phone number)', error: dbError.message });
      }
    }

    // Return the order to the frontend
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay/Supabase Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
