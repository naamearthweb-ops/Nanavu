import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

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

  const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "PROGRAMME", link: "#workshops" },
    { name: "SPEAKERS", link: "#speakers" },
    // { name: "EXPO & IDEATHON", link: "#experience" },
    { name: "PARTNERS", link: "#partners" },
    { name: "IMPACT", link: "#impact" },
    { name: "REGISTER", link: "#join" },
  ];

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
        <div className="h-full flex flex-col justify-between p-8">

          {/* TOP */}
          <div>

            <div className="flex justify-between items-center mb-16">

              <span className="text-sm tracking-[0.3em] uppercase">
                NANAVU '26
              </span>

            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col">

              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="
                    group
                    flex items-center
                    gap-5
                    py-4
                    border-b border-white/10
                    hover:pl-4
                    transition-all duration-300
                  "
                >

                  <span className="text-xs opacity-40">
                    0{index + 1}
                  </span>

                  <span className="text-2xl font-medium tracking-wide">
                    {item.name}
                  </span>

                  <span
                    className="
                      ml-auto
                      opacity-0
                      group-hover:opacity-100
                      transition
                    "
                  >
                    →
                  </span>

                </a>
              ))}

            </div>
          </div>

          {/* BOTTOM */}
          <div className="text-xs opacity-50 tracking-widest">

            <p>SUSTAINABLE CONCLAVE</p>

            <p className="mt-2">
              TKMCE KOLLAM · KERALA · INDIA
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;