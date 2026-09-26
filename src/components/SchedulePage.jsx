import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SchedulePage() {
  const containerRef = useRef(null);

  const forenoonSchedule = [
    { time: "9:30 – 10:15 AM", session: "Inaugural Session", details: "Inauguration & Opening Remarks" },
    { time: "10:15 – 11:00 AM", session: "Technical Session I", speaker: "Ar. Vinu Daniel", topic: "Can We Build Differently? A Conversation with the Next Generation" },
    { time: "11:00 – 11:15 AM", session: "Refreshment Break", type: "break" },
    { time: "11:15 AM – 12:00 PM", session: "Technical Session II", speaker: "Ar. P. B. Sajan", topic: "Bamboo for Contemporary Architecture: From Concept to Construction" },
    { time: "12:00 – 12:20 PM", session: "Panelist Spotlight I", speaker: "Dr. V. Subhash Chandra Bose", topic: "The Last Bus for Green Initiatives: Sustainability - Still Out of Syllabus?" },
  ];

  const afternoonSchedule = [
    { time: "2:00 – 2:20 PM", session: "Panelist Spotlight II", speaker: "Ar. Manasi Puliyappatta", topic: "Sustainability as a Way of Thinking: The Bhoomija Story" },
    { time: "2:20 – 2:40 PM", session: "Panelist Spotlight III", speaker: "Ar. Kukku Joseph Jose", topic: "Sustainability: Isn't My Responsibility?" },
    { time: "2:40 – 3:00 PM", session: "Panelist Spotlight IV", speaker: "Er. K. Madhavan Namboodiri", topic: "An Iterative Action Research Initiative in Pursuit of Sustainable Habitat Systems in Kerala" },
    { time: "3:00 – 3:15 PM", session: "Refreshment Break", type: "break" },
    { time: "3:15 – 4:15 PM", session: "Panel Discussion", topic: "Bridging Education and Practice: Why Sustainability Remains Optional in Construction?" },
    { time: "4:15 – 4:45 PM", session: "Valedictory & Prize Distribution", details: "Closing remarks, recognition & awards" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".schedule-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ".schedule-item",
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".schedule-container", start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#F3EFE6] text-[#29312F] min-h-screen font-sans">
      <Navbar />

      <section ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-24 relative">
        <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-10 hidden sm:block">
          <Link to="/" className="text-[#287A73] hover:text-[#1f635c] text-sm font-medium flex items-center gap-2 transition-colors">
            <span>←</span> Back to Home
          </Link>
        </div>
        <div className="schedule-header max-w-5xl mx-auto mb-16 text-center">
          <span className="text-[10px] tracking-[0.4em] text-[#287A73] uppercase mb-4 block">Nanavu '26</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-[-0.04em] mb-8">Programme Schedule</h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a 
              href="/brochure.pdf" 
              download="Nanavu_Brochure.pdf"
              className="bg-[#287A73] hover:bg-[#1f635c] text-white px-8 py-3.5 rounded-full text-sm tracking-wider font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>DOWNLOAD BROCHURE</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

        <div className="schedule-container max-w-4xl mx-auto space-y-16">
          
          {/* FORENOON */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-[#287A73]">Forenoon</h2>
              <span className="text-sm tracking-widest text-gray-500 bg-white/50 px-4 py-1 rounded-full border border-gray-200">9:30 AM – 12:20 PM</span>
              <div className="flex-1 h-[1px] bg-[#287A73]/20"></div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/50">
              {forenoonSchedule.map((item, idx) => (
                <div key={idx} className={`schedule-item grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-4 ${idx !== forenoonSchedule.length - 1 ? 'border-b border-gray-200/60' : ''} ${item.type === 'break' ? 'bg-[#287A73]/5 rounded-xl my-2' : ''}`}>
                  <div className="md:col-span-3 text-sm font-medium tracking-wide text-gray-600 pt-1">
                    {item.time}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className={`text-lg font-medium ${item.type === 'break' ? 'text-[#287A73]' : 'text-[#29312F]'}`}>{item.session}</h3>
                    {item.details && <p className="text-sm text-gray-600 mt-1">{item.details}</p>}
                    {item.speaker && <p className="text-sm font-semibold text-[#8B6E4A] mt-1.5">{item.speaker}</p>}
                    {item.topic && <p className="text-[13px] italic text-gray-600 mt-0.5">"{item.topic}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PARALLEL EVENT - FORENOON */}
          <div className="schedule-item bg-[#8B6E4A]/10 border border-[#8B6E4A]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-[#8B6E4A] text-white p-3 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-lg font-medium text-[#8B6E4A]">Concept Pitching Challenge</h3>
                <span className="text-xs tracking-widest text-[#8B6E4A]/80 border border-[#8B6E4A]/30 px-3 py-0.5 rounded-full">10:30 AM – 12:00 PM</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">The 2050 Kerala Home</p>
              <p className="text-[13px] text-gray-600 mt-1">Imagine a home in Kerala that is affordable, low-carbon, climate-resilient and comfortable. A concept pitching challenge running alongside the forenoon technical sessions.</p>
            </div>
          </div>

          {/* AFTERNOON */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-[#287A73]">Afternoon</h2>
              <span className="text-sm tracking-widest text-gray-500 bg-white/50 px-4 py-1 rounded-full border border-gray-200">2:00 PM – 5:00 PM</span>
              <div className="flex-1 h-[1px] bg-[#287A73]/20"></div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/50">
              {afternoonSchedule.map((item, idx) => (
                <div key={idx} className={`schedule-item grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-4 ${idx !== afternoonSchedule.length - 1 ? 'border-b border-gray-200/60' : ''} ${item.type === 'break' ? 'bg-[#287A73]/5 rounded-xl my-2' : ''}`}>
                  <div className="md:col-span-3 text-sm font-medium tracking-wide text-gray-600 pt-1">
                    {item.time}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className={`text-lg font-medium ${item.type === 'break' ? 'text-[#287A73]' : 'text-[#29312F]'}`}>{item.session}</h3>
                    {item.details && <p className="text-sm text-gray-600 mt-1">{item.details}</p>}
                    {item.speaker && <p className="text-sm font-semibold text-[#8B6E4A] mt-1.5">{item.speaker}</p>}
                    {item.topic && <p className="text-[13px] italic text-gray-600 mt-0.5">"{item.topic}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXHIBITION */}
          <div className="schedule-item bg-gray-100 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
             <div className="bg-gray-300 text-gray-700 p-4 rounded-xl flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
             </div>
             <div>
               <h3 className="text-lg font-medium text-gray-800 tracking-widest uppercase mb-1">Exhibition</h3>
               <p className="text-sm text-gray-600">A curated showcase of innovative ideas, materials, technologies, and student projects focused on sustainable construction, running parallel to the conclave.</p>
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SchedulePage;
