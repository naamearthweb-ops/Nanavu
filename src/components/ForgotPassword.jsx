import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ForgotPassword() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/");
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let resetEmail = identifier.trim();
      const isPhone = /^[0-9+\-\s()]+$/.test(resetEmail);

      if (isPhone) {
        // Query the registrations table to find the email associated with this phone number
        const { data: regData, error: regError } = await supabase
          .from('registrations')
          .select('email')
          .eq('phone', resetEmail)
          .single();

        if (regError || !regData) {
          throw new Error("No account found with this phone number");
        }
        
        resetEmail = regData.email;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link");
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
        <div className="text-center max-w-md mx-auto bg-[#29312F] p-12 rounded-3xl border border-[#287A73]/40 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#287A73]/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#287A73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl text-white mb-4 font-light tracking-tight">Check Your Email</h2>
          <p className="text-[#8C877D] font-light mb-8">
            We've sent a password reset link to your email address. Please check your inbox and spam folder.
          </p>
          <Link to="/login" className="inline-block bg-[#287A73] text-[#F3EFE6] px-8 py-3 rounded-xl hover:bg-[#287A73]/80 transition text-xs tracking-widest uppercase">
            Return to Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
            RECOVERY
          </p>
          <h2 className="text-4xl leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
            RESET PASSWORD
          </h2>
          <p className="mt-4 text-sm text-[#8C877D] font-light">
            Enter your email or phone number to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleReset} className="bg-[#29312F] p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-2xl">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">{error}</div>}
          
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Email or Phone Number</label>
            <input 
              required 
              type="text" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              placeholder="e.g. name@college.edu or 9876543210" 
              className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-[#F3EFE6] focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#287A73]/20"
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
             <Link to="/login" className="text-[#8C877D] text-xs hover:text-white transition tracking-wide">
               Remembered your password? Sign In
             </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
