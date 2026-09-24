import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // Can be email or phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let loginEmail = identifier.trim();

      const isPhone = /^[0-9+\-\s()]+$/.test(loginEmail);

      if (isPhone) {
        const { data: regData, error: regError } = await supabase
          .from('registrations')
          .select('email')
          .eq('phone', loginEmail)
          .single();

        if (regError || !regData) {
          throw new Error("No account found with this phone number");
        }
        
        loginEmail = regData.email;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Check payment status
        const { data: regCheck } = await supabase
          .from('registrations')
          .select('payment_status')
          .eq('user_id', data.user.id)
          .single();

        if (regCheck && regCheck.payment_status === 'PENDING') {
          navigate("/checkout");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <section className="min-h-screen bg-[#1E2523]" />;
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32 relative">
      <Link to="/" className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 text-[#8C877D] hover:text-white transition-colors group">
        <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
        <span className="text-xs tracking-widest uppercase mt-0.5">Back to Home</span>
      </Link>
      
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
            NANAVU '26
          </p>
          <h2 className="text-4xl leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
            SIGN IN
          </h2>
          <p className="mt-4 text-sm text-[#8C877D] font-light">
            Access your registration profile.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#29312F] p-8 rounded-2xl border border-white/10 flex flex-col gap-6 shadow-xl">
          {error && <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-[#8C877D] uppercase">Email or Phone Number</label>
            <input required type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="e.g. name@college.edu or 9876543210" className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Password</label>
              <Link to="/forgot-password" className="text-[10px] tracking-widest text-[#287A73] hover:text-[#4ADE80] transition uppercase">Forgot Password?</Link>
            </div>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-widest uppercase font-medium transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center mt-2 flex flex-col gap-2">
             <Link to="/register" className="text-[#8C877D] text-xs hover:text-white transition">Don't have an account? Register</Link>
             <Link to="/" className="text-[#8C877D] text-xs hover:text-white transition">Return to Home</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
