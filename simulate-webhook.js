import crypto from 'crypto';
import fetch from 'node-fetch'; // Make sure you are using Node 18+ which has built-in fetch
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function simulateWebhook() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const webhookUrl = 'http://localhost:3000/api/razorpay-webhook'; // Change to your local API port (or production URL)
  
  // Replace this order_id with a real PENDING order_id from your database
  const targetOrderId = "order_abc123"; 
  
  const payload = {
    entity: "event",
    event: "payment.captured",
    contains: ["payment"],
    payload: {
      payment: {
        entity: {
          id: "pay_xyz123", // Dummy payment ID
          order_id: targetOrderId,
          status: "captured",
          amount: 50000
        }
      }
    }
  };

  const bodyString = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', secret).update(bodyString).digest('hex');

  console.log("Sending simulated webhook to:", webhookUrl);
  
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': signature
      },
      body: bodyString
    });

    if (res.ok) {
      console.log("✅ Webhook processed successfully!");
    } else {
      const errorText = await res.text();
      console.log("❌ Webhook failed:", res.status, errorText);
    }
  } catch (err) {
    console.log("Network Error (Is your server running?):", err.message);
  }
}

simulateWebhook();
