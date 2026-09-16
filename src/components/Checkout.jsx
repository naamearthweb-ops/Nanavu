import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const FIXED_AMOUNT = 350;

function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/login");
        return;
      }
      
      setSession(session);

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
        
      if (data && !error) {
        if (data.payment_status === 'PAID') {
          // If already paid, kick them out to Home
          navigate("/");
          return;
        }
        setRegistration(data);
      }
      setCheckingAuth(false);
    };

    fetchUserData();
  }, [navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create retry order on backend
      const res = await fetch("/api/retry-payment", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          amount: FIXED_AMOUNT * 100,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.message || "Failed to create order");

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend key
        amount: order.amount,
        currency: order.currency,
        name: "NANAVU '26",
        description: `Registration Pass`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              setSuccess(true);
            } else {
              setError(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            setError("Error verifying payment.");
          }
        },
        prefill: {
          name: registration.full_name,
          email: registration.email,
          contact: registration.phone,
        },
        theme: {
          color: "#287A73",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError(response.error.description || "Payment failed");
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <section className="min-h-screen bg-[#1E2523]" />;
  }

  if (success) {
    return (
      <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex flex-col items-center justify-center px-6 py-32">
        <div className="text-center max-w-2xl mx-auto bg-[#29312F] p-12 rounded-2xl border border-[#287A73]/40 shadow-xl">
          <h2 className="text-4xl text-[#287A73] mb-4">Payment Successful!</h2>
          <p className="text-[#8C877D]">Thank you for completing your registration for NANAVU '26.</p>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/" className="inline-block border border-[#287A73] text-[#287A73] px-6 py-3 rounded-xl hover:bg-[#287A73] hover:text-[#F3EFE6] transition">Return to Home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      
      {/* DECORATIVE BLOBS */}
      <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-[#287A73]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#D8C7A5]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
            FINAL STEP
          </p>
          <h2 className="text-4xl leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
            COMPLETE PAYMENT
          </h2>
          <p className="mt-4 text-sm text-[#8C877D] font-light">
            Your account is created, but your registration pass is pending payment.
          </p>
        </div>

        <div className="bg-[#29312F]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-2xl">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">{error}</div>}
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <span className="text-sm text-[#8C877D] uppercase tracking-widest">Name</span>
              <span className="text-sm text-white font-medium">{registration?.full_name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <span className="text-sm text-[#8C877D] uppercase tracking-widest">Amount</span>
              <span className="text-xl text-white font-medium">₹{FIXED_AMOUNT}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8C877D] uppercase tracking-widest">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                Pending
              </span>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="mt-2 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#287A73]/20"
          >
            {loading ? "Processing..." : `Pay ₹${FIXED_AMOUNT} Now`}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
