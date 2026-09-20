import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [session, setSession] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchRegistration = async (userEmail) => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', userEmail)
      .order('created_at', { ascending: false })
      .limit(1);
      
    if (data && data.length > 0 && !error) {
      setRegistration(data[0]);
    } else {
      setRegistration(null);
    }
  };

  const checkAdminStatus = async (token) => {
    try {
      const res = await fetch('/api/admin/check', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.isAdmin) setIsAdmin(true);
    } catch (err) {
      console.error("Admin check failed", err);
    }
  };

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.email) {
        fetchRegistration(session.user.email);
      }
      if (session?.access_token) {
        checkAdminStatus(session.access_token);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        fetchRegistration(session.user.email);
      } else {
        setRegistration(null);
        setIsAdmin(false);
      }
      if (session?.access_token) {
        checkAdminStatus(session.access_token);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
        setMenuOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (!menuOpen) return;
      if (panelRef.current?.contains(event.target)) return;
      if (buttonRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
    setMenuOpen(false);
    window.location.href = "/";
  };

  let menuItems = [
    { name: "ABOUT", link: "/#about" },
    { name: "PROGRAMME", link: "/#workshops" },
    { name: "SPEAKERS", link: "/#speakers" },
    { name: "PARTNERS", link: "/#partners" },
    { name: "IMPACT", link: "/#impact" },
  ];

  // Only show REGISTER if not logged in
  if (!session) {
    menuItems.push({ name: "REGISTER", link: "/register" });
    menuItems.push({ name: "SIGN IN", link: "/login" });
  }

  return (
    <>
      {/* MENU BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`
          fixed top-4 right-4 sm:top-6 sm:right-6 z-[60]
          w-14 h-14 sm:w-16 sm:h-16
          text-gray-700
          flex items-center justify-center
          text-xl sm:text-2xl
          hover:scale-110
          transition-all duration-500

          ${
            showNavbar
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }
        `}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* SIDE PANEL */}
      <div
        ref={panelRef}
        className={`
          fixed
          top-4
          right-4
          bottom-4
          w-[calc(100vw-2rem)]
          sm:w-[340px]
          md:w-[380px]
          max-w-[380px]

          z-50

          bg-black/80
          backdrop-blur-xl
          text-white

          rounded-3xl
          border border-white/20
          shadow-2xl

          transition-all
          duration-500
          ease-in-out

          ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-[110%] opacity-0 pointer-events-none"
          }
        `}
      >
        {/* PANEL CONTENT */}
        <div className="h-full flex flex-col justify-between p-8 overflow-y-auto">

          {/* TOP */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm tracking-[0.3em] uppercase">
                NANAVU '26
              </span>
            </div>

            {/* MINI PROFILE SECTION */}
            {session && (
              <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#287A73] flex items-center justify-center text-lg text-white font-medium">
                    {session.user?.user_metadata?.full_name?.charAt(0) || session.user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session.user?.user_metadata?.full_name || "Attendee"}
                    </p>
                    <p className="text-xs text-white/50 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    {registration?.payment_status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-[10px] tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                        Registered
                      </span>
                    ) : registration?.payment_status === 'PENDING' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        Payment Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] tracking-widest uppercase">
                        Unregistered
                      </span>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="text-[10px] text-red-400 hover:text-red-300 tracking-widest uppercase transition"
                    >
                      Sign Out
                    </button>
                  </div>
                  
                  <Link 
                    to="/settings" 
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white/70 hover:text-white tracking-widest uppercase transition-all"
                  >
                    Edit Profile
                  </Link>

                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-[#287A73]/20 hover:bg-[#287A73]/40 border border-[#287A73]/50 rounded-xl text-xs text-[#4ADE80] tracking-widest uppercase transition-all"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* MENU ITEMS */}
            <div className="flex flex-col">
              {menuItems.map((item, index) => {
                // If it's a link to a hash like "/#about", we use <a> tag, else <Link>
                const isHashLink = item.link.includes("#");

                const className = `
                  group
                  flex items-center
                  gap-5
                  py-4
                  border-b border-white/10
                  hover:pl-4
                  transition-all duration-300
                  ${item.name === "REGISTER" || item.name === "SIGN IN" ? "text-[#287A73]" : ""}
                `;

                const content = (
                  <>
                    <span className="text-xs opacity-40">0{index + 1}</span>
                    <span className="text-2xl font-medium tracking-wide">{item.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition">→</span>
                  </>
                );

                return isHashLink ? (
                  <a key={item.name} href={item.link} onClick={() => setMenuOpen(false)} className={className}>
                    {content}
                  </a>
                ) : (
                  <Link key={item.name} to={item.link} onClick={() => setMenuOpen(false)} className={className}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="text-xs opacity-50 tracking-widest mt-8">
            <p>SUSTAINABLE CONCLAVE</p>
            <p className="mt-2">TKMCE KOLLAM · KERALA · INDIA</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;