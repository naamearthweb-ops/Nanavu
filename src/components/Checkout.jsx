import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";



function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [success, setSuccess] = useState(false);

  const [userType, setUserType] = useState("student");
  const [optIdeathon, setOptIdeathon] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const baseAmount = userType === "student" ? 300 : 600;
  const displayAmount = baseAmount + (optIdeathon ? 50 : 0);

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
        .select('*, teams(name)')
        .eq('user_id', session.user.id)
        .single();
        
      if (data && !error) {
        if (data.payment_status === 'PAID') {
          // If already paid, kick them out to Home
          navigate("/");
          return;
        }
        setRegistration(data);
        setUserType(data.amount_paid_inr === 600 || data.amount_paid_inr === 750 ? "other" : "student");
        setOptIdeathon(data.ideathon_opt_in || false);
        if (data.teams?.name) setTeamName(data.teams.name);
      }
      setCheckingAuth(false);
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (optIdeathon && availableTeams.length === 0) {
      fetch("/api/teams")
        .then(res => res.json())
        .then(data => {
          if (data.teams) setAvailableTeams(data.teams);
        })
        .catch(err => console.error("Failed to fetch teams"));
    }
  }, [optIdeathon, availableTeams.length]);

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
          userType,
          optIdeathon,
          teamName,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.message || "Failed to create order");

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Nanavu '26",
        description: "Registration Fee (Retry)",
        order_id: order.id,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.message || "Payment verification failed");

            setSuccess(true);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: registration?.full_name || session?.user?.user_metadata?.full_name || "User",
          email: registration?.email || session?.user?.email || "",
          contact: registration?.phone || ""
        },
        theme: {
          color: "#287A73"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        setError(response.error.description);
        setLoading(false);
      });
      rzp1.open();

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <section className="min-h-screen bg-[#1E2523] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#287A73]/30 border-t-[#287A73] rounded-full animate-spin"></div>
        <p className="text-xs text-[#8C877D] tracking-widest uppercase">Loading Checkout...</p>
      </section>
    );
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
              <span className="text-sm text-white font-medium">{registration?.full_name || session?.user?.user_metadata?.full_name || session?.user?.email || "Attendee"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <span className="text-sm text-[#8C877D] uppercase tracking-widest">Amount</span>
              <span className="text-xl text-white font-medium">₹{displayAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8C877D] uppercase tracking-widest">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                Pending
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2 mb-2 p-4 border border-[#287A73]/30 rounded-xl bg-[#1E2523]">
            <label className="text-xs tracking-widest text-[#8C877D] uppercase">Modify Registration Type</label>
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" 
                  name="userType" 
                  value="student" 
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                  className="accent-[#287A73]"
                />
                Student (₹300)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" 
                  name="userType" 
                  value="other" 
                  checked={userType === "other"}
                  onChange={() => setUserType("other")}
                  className="accent-[#287A73]"
                />
                Professional/Other (₹600)
              </label>
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <label className="flex items-center gap-3 cursor-pointer text-sm">
              <input 
                type="checkbox" 
                checked={optIdeathon}
                onChange={(e) => setOptIdeathon(e.target.checked)}
                className="accent-[#287A73] w-4 h-4 rounded"
              />
              <span>Opt-in for Concept Pitching Add-on <span className="text-[#287A73] font-medium">(+₹50)</span></span>
            </label>

            {optIdeathon && (
              <div className="mt-4 flex flex-col gap-2 relative">
                <label className="text-xs tracking-widest text-[#8C877D] uppercase">Team Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                      setShowTeamDropdown(true);
                    }}
                    onFocus={() => setShowTeamDropdown(true)}
                    onBlur={() => setTimeout(() => setShowTeamDropdown(false), 200)}
                    placeholder="Create a new team or search..."
                    className="w-full bg-[#1E2523] border border-[#287A73]/50 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition"
                  />
                  {showTeamDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1E2523] border border-[#287A73]/30 rounded-lg max-h-40 overflow-y-auto z-50 shadow-xl">
                      {availableTeams
                        .filter(t => t.toLowerCase().includes(teamName.toLowerCase()))
                        .map((team, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => {
                              setTeamName(team);
                              setShowTeamDropdown(false);
                            }}
                            className="p-3 text-sm text-[#F3EFE6] hover:bg-[#287A73]/20 cursor-pointer transition"
                          >
                            {team}
                          </div>
                      ))}
                      {teamName && !availableTeams.find(t => t.toLowerCase() === teamName.toLowerCase()) && (
                        <div className="p-3 text-sm text-[#4ADE80] border-t border-[#287A73]/30">
                          Create new team: "{teamName}"
                        </div>
                      )}
                      {!teamName && availableTeams.length === 0 && (
                        <div className="p-3 text-sm text-[#8C877D] italic">Type to create the first team!</div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-[#8C877D]">Max 4 members per team. If a team is full, you cannot join it.</p>
              </div>
            )}
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="mt-2 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#287A73]/20"
          >
            {loading ? "Processing..." : `Complete Registration`}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
