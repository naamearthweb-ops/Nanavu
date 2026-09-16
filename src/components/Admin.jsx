import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [session, setSession] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  
  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // Manage Admins State
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMsg, setAdminMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      navigate("/login");
      return;
    }
    setSession(session);

    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to fetch data");
      
      setUsers(data.users);
      setAdminRole(data.adminRole);

      if (data.adminRole === 'SUPER_ADMIN') {
        fetchAdmins(session.access_token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async (token) => {
    try {
      const res = await fetch('/api/admin/admins', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setAdmins(data.admins);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminMsg({ text: "", type: "" });
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newAdminEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setAdminMsg({ text: data.tempPassword ? `${data.message} Temp Pass: ${data.tempPassword}` : data.message, type: "success" });
      setNewAdminEmail("");
      fetchAdmins(session.access_token);
    } catch (err) {
      setAdminMsg({ text: err.message, type: "error" });
    } finally {
      setAdminLoading(false);
    }
  };

  const handleRemoveAdmin = async (email) => {
    if (!confirm(`Are you sure you want to remove ${email} from admins?`)) return;
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      if (res.ok) fetchAdmins(session.access_token);
      else alert("Failed to remove admin.");
    } catch (err) {
      alert("Error removing admin.");
    }
  };

  const downloadCSV = () => {
    if (!filteredUsers.length) return;
    
    // Define headers
    const headers = ["Name", "Email", "Phone", "WhatsApp", "Organization", "Branch", "Year", "Status", "Order ID", "Amount Paid"];
    
    // Map data to rows
    const rows = filteredUsers.map(u => [
      `"${u.full_name || ''}"`,
      `"${u.email || ''}"`,
      `"${u.phone || ''}"`,
      `"${u.whatsapp || ''}"`,
      `"${u.organization || ''}"`,
      `"${u.branch || ''}"`,
      `"${u.year_of_study || ''}"`,
      `"${u.payment_status || ''}"`,
      `"${u.razorpay_order_id || ''}"`,
      `"${u.amount_paid_inr || 0}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nanavu_students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <section className="min-h-screen bg-[#1E2523] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#287A73] border-t-transparent rounded-full animate-spin"></div></section>;

  if (error) return (
    <section className="min-h-screen bg-[#1E2523] text-white flex flex-col items-center justify-center p-6">
      <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-md text-center">
        <h2 className="text-xl text-red-400 mb-2">Access Denied</h2>
        <p className="text-sm text-red-200/70 mb-6">{error}</p>
        <Link to="/" className="text-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition">Go Home</Link>
      </div>
    </section>
  );

  const filteredUsers = users.filter(u => {
    const searchString = (u.full_name + u.email + u.phone).toLowerCase();
    const matchesSearch = searchString.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || u.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-[#1E2523] text-[#F3EFE6] py-24 px-6 relative overflow-hidden">
      
      {/* DECORATIVE BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#287A73]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4ADE80]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#287A73] mb-3">
              CONTROL PANEL
            </p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                Admin Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-[10px] tracking-widest uppercase">
                {adminRole}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={downloadCSV} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-3 rounded-xl text-xs tracking-widest uppercase transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export CSV
            </button>
            <Link to="/" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group">
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </Link>
          </div>
        </div>

        {/* SUPER ADMIN TOOLS */}
        {adminRole === 'SUPER_ADMIN' && (
          <div className="bg-[#29312F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-light tracking-wide text-white mb-6">Manage Sub-Admins</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleAddAdmin} className="flex gap-3 items-end">
                  <div className="w-full space-y-2">
                    <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Add New Admin Email</label>
                    <input required type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} placeholder="admin@example.com" className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-[#287A73] outline-none transition-all" />
                  </div>
                  <button type="submit" disabled={adminLoading} className="bg-[#287A73] hover:bg-[#287A73]/80 disabled:opacity-50 text-[#F3EFE6] px-6 py-3.5 rounded-xl text-xs tracking-widest uppercase transition-all whitespace-nowrap">
                    {adminLoading ? "..." : "Add Admin"}
                  </button>
                </form>
                {adminMsg.text && (
                  <div className={`mt-4 p-4 rounded-xl text-xs ${adminMsg.type === 'error' ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30'}`}>
                    {adminMsg.text}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-[#8C877D] uppercase">Active Admins</label>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {admins.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div>
                        <p className="text-sm text-white">{admin.email}</p>
                        <p className="text-[10px] text-[#8C877D] uppercase tracking-widest mt-0.5">{admin.role}</p>
                      </div>
                      {admin.role !== 'SUPER_ADMIN' && (
                        <button onClick={() => handleRemoveAdmin(admin.email)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition">Remove</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DATA TABLE SECTION */}
        <div className="bg-[#29312F]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          
          {/* Table Header/Filters */}
          <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-xl font-light tracking-wide text-white">Registered Students <span className="text-[#8C877D] text-base ml-2">({filteredUsers.length})</span></h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Search Name, Email, or Phone..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white focus:border-[#287A73] outline-none transition min-w-[250px]"
              />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white focus:border-[#287A73] outline-none transition appearance-none cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="PAID">Paid Only</option>
                <option value="PENDING">Pending Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] tracking-widest uppercase text-[#8C877D]">
                  <th className="p-6 font-medium">Name</th>
                  <th className="p-6 font-medium">Contact</th>
                  <th className="p-6 font-medium">College</th>
                  <th className="p-6 font-medium">Branch/Year</th>
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium">Order ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition group">
                    <td className="p-6">
                      <p className="text-sm text-white font-medium">{u.full_name}</p>
                      <p className="text-xs text-[#8C877D] mt-1">{new Date(u.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-white">{u.email}</p>
                      <p className="text-xs text-[#8C877D] mt-1">P: {u.phone} | W: {u.whatsapp}</p>
                    </td>
                    <td className="p-6 text-sm text-[#F3EFE6] max-w-[200px] truncate" title={u.organization}>
                      {u.organization}
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-[#F3EFE6]">{u.branch}</p>
                      <p className="text-xs text-[#8C877D] mt-1">Year {u.year_of_study}</p>
                    </td>
                    <td className="p-6">
                      {u.payment_status === 'PAID' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-[10px] tracking-widest uppercase whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                          PAID
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] tracking-widest uppercase whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-xs text-[#8C877D] font-mono">
                      {u.razorpay_order_id || 'N/A'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-[#8C877D]">
                      No students found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
      {/* Custom Scrollbar Styles for the specific div */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}} />
    </section>
  );
}

export default Admin;
