import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const FIXED_AMOUNT = 350; // Fixed amount in INR

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    password: "",
    organization: "",
    branch: "",
    year: "1",
    otherYear: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [user, setUser] = useState(null);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        alert("You are already signed in.");
        navigate("/");
        return;
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // 1. Create order on backend
      const amount = FIXED_AMOUNT * 100; // in paise
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          organization: formData.organization,
          branch: formData.branch,
          year_of_study: formData.year === 'Other' ? formData.otherYear : formData.year,
          password: formData.password,
          bypass_payment: true // TEMPORARY: set to true to bypass Razorpay
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.message || "Failed to create order");

      // TEMPORARY BYPASS: Directly log in
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setLoading(false);
      return;
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
          <h2 className="text-4xl text-[#287A73] mb-4">Registration Successful!</h2>
          <p className="text-[#8C877D]">Thank you for registering for NANAVU '26. Your account has been created.</p>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/" className="inline-block border border-[#287A73] text-[#287A73] px-6 py-3 rounded-xl hover:bg-[#287A73] hover:text-[#F3EFE6] transition">Return to Home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
            JOIN THE CONCLAVE
          </p>
          <h2 className="text-[10vw] md:text-[5vw] leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
            REGISTER
          </h2>
          <p className="mt-4 text-sm text-[#8C877D] font-light">
            Fill in your details below to secure your pass for NANAVU '26. <br/> 
            An account will be created for you to access your profile.
          </p>
        </div>

        <form onSubmit={handlePayment} className="bg-[#29312F] p-8 rounded-2xl border border-white/10 flex flex-col gap-6 shadow-xl">
          {error && <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-[#8C877D] uppercase">Full Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Email ID</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Create Password</label>
              <input required type="password" name="password" minLength={6} value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">WhatsApp Number</label>
              <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-[#8C877D] uppercase">College / Organization Name</label>
            <input required type="text" name="organization" value={formData.organization} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Branch / Field of Study</label>
              <input required type="text" name="branch" value={formData.branch} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#8C877D] uppercase">Year of Study</label>
              <select required name="year" value={formData.year} onChange={handleChange} className="bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition appearance-none">
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="Other">Other</option>
              </select>
              {formData.year === "Other" && (
                <input 
                  required 
                  type="text" 
                  name="otherYear" 
                  value={formData.otherYear} 
                  onChange={handleChange} 
                  placeholder="Please specify"
                  className="mt-2 bg-[#1E2523] border border-white/10 p-3 rounded-lg text-sm text-[#F3EFE6] focus:border-[#287A73] outline-none transition" 
                />
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-widest uppercase font-medium transition-all"
          >
            {loading ? "Processing..." : `Register`}
          </button>
          
          <div className="text-center mt-2">
             <Link to="/login" className="text-[#8C877D] text-xs hover:text-white transition">Already registered? Sign in</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;