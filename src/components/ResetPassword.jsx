import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // When the user clicks the link in their email, Supabase automatically authenticates them
    // and stores the session in local storage. We just need to verify they are logged in.
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        // If they somehow land here without a valid recovery session, kick them out
        navigate("/login");
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw new Error(error.message);
      }

      // Password updated successfully. They are already logged in, so send them home.
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <section className="min-h-screen bg-[#1E2523]" />;
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
            SECURE YOUR ACCOUNT
          </p>
          <h2 className="text-4xl leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
            NEW PASSWORD
          </h2>
          <p className="mt-4 text-sm text-[#8C877D] font-light">
            Please enter your new secure password below.
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="bg-[#29312F] p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-2xl">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">{error}</div>}
          
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">New Password</label>
            <input 
              required 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Minimum 6 characters" 
              className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-[#F3EFE6] focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Confirm Password</label>
            <input 
              required 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm new password" 
              className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-[#F3EFE6] focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#287A73]/20"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
