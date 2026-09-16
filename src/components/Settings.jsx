import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Settings() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [registration, setRegistration] = useState(null);
  
  // Detail Form State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    organization: "",
    branch: "",
    year_of_study: ""
  });
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsSuccess, setDetailsSuccess] = useState("");
  const [detailsError, setDetailsError] = useState("");

  // Password Form State
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        setRegistration(data);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          organization: data.organization || "",
          branch: data.branch || "",
          year_of_study: data.year_of_study || ""
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDetailsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    setDetailsError("");
    setDetailsSuccess("");

    try {
      // If email changed, update auth.users
      if (formData.email !== registration.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email: formData.email });
        if (emailError) throw emailError;
      }

      // Update auth.users metadata for full name
      if (formData.full_name !== registration.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: formData.full_name }
        });
      }

      // Update registrations table
      const { error } = await supabase
        .from('registrations')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          organization: formData.organization,
          branch: formData.branch,
          year_of_study: formData.year_of_study
        })
        .eq('user_id', session.user.id);

      if (error) {
        if (error.code === '23505') {
          throw new Error("Email or Phone number is already in use by another account.");
        }
        throw error;
      }

      setRegistration({ ...registration, ...formData });
      setDetailsSuccess("Profile details updated successfully.");
      
      setTimeout(() => setDetailsSuccess(""), 5000);
    } catch (err) {
      setDetailsError(err.message || "Failed to update profile details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) throw error;

      setPasswordSuccess("Password updated successfully.");
      setPasswords({ newPassword: "", confirmPassword: "" });
      
      setTimeout(() => setPasswordSuccess(""), 5000);
    } catch (err) {
      setPasswordError(err.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!session) {
    return <section className="min-h-screen bg-[#1E2523]" />;
  }

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] py-24 px-6 relative overflow-hidden">
      
      {/* DECORATIVE BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#287A73]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#4ADE80]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#287A73] mb-3">
              ACCOUNT
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Settings
            </h1>
          </div>
          <Link to="/" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group">
            <svg className="w-5 h-5 text-white/70 group-hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        {registration?.payment_status === 'PENDING' && (
          <div className="mb-12 bg-yellow-500/10 border border-yellow-500/30 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
            <div>
              <h2 className="text-xl font-medium text-yellow-500 mb-2">Payment Pending</h2>
              <p className="text-sm text-yellow-200/70">Your registration is incomplete. Please complete your payment of ₹350 to secure your pass for the event.</p>
            </div>
            <Link to="/checkout" className="w-full md:w-auto text-center bg-yellow-500 text-yellow-950 px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all text-xs tracking-widest uppercase font-bold shadow-lg shadow-yellow-500/20 whitespace-nowrap">
              Pay Now
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT COL: PROFILE DETAILS */}
          <div className="bg-[#29312F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl h-fit">
            <h2 className="text-xl font-light tracking-wide text-white mb-6">Profile Details</h2>
            
            {detailsError && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">{detailsError}</div>}
            {detailsSuccess && <div className="mb-6 p-4 bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] text-sm rounded-xl">{detailsSuccess}</div>}

            <form onSubmit={handleUpdateDetails} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Full Name</label>
                  <input required type="text" name="full_name" value={formData.full_name} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                  <p className="text-[10px] text-[#8C877D]">* Changing this requires email verification</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">WhatsApp</label>
                    <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">College / Organization</label>
                  <input required type="text" name="organization" value={formData.organization} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Branch</label>
                    <input required type="text" name="branch" value={formData.branch} onChange={handleDetailsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Year</label>
                    <select required name="year_of_study" value={formData.year_of_study} onChange={handleDetailsChange} className="w-full bg-[#29312F] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] outline-none transition-all appearance-none">
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={detailsLoading}
                className="w-full mt-4 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-[#287A73]/20"
              >
                {detailsLoading ? "Saving..." : "Save Details"}
              </button>
            </form>
          </div>

          {/* RIGHT COL: PASSWORD & DANGER ZONE */}
          <div className="flex flex-col gap-8">
            
            {/* PASSWORD */}
            <div className="bg-[#29312F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h2 className="text-xl font-light tracking-wide text-white mb-6">Change Password</h2>
              
              {passwordError && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">{passwordError}</div>}
              {passwordSuccess && <div className="mb-6 p-4 bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] text-sm rounded-xl">{passwordSuccess}</div>}

              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">New Password</label>
                  <input required type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Confirm Password</label>
                  <input required type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordsChange} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] focus:bg-white/10 outline-none transition-all" />
                </div>

                <button 
                  type="submit" 
                  disabled={passwordLoading}
                  className="w-full mt-2 border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 py-4 rounded-xl text-xs tracking-[0.2em] uppercase transition-all"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Settings;
