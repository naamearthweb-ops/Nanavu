import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "test_receipt",
    });
    console.log("Success! Order ID:", order.id);
  } catch (error) {
    console.error("Razorpay Error:", error);
  }
}

test();
