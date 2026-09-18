import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PeopleBehind() {
  const sectionRef = useRef(null);

  const advisors = [
    {
      name: "P. K. Kunhalikutty",
      role: "Minister for AI & Entrepreneurship",
      image: "https://www.brandkeralaonline.com/wp-content/uploads/2026/05/PK-Kunhalikutty-Minister-Industries-IT-AI-1-1140x570.jpg"
    },
    {
      name: "Shri Sunny Joseph",
      role: "Minister of Environment & Climate Change",
      image: "https://envt.kerala.gov.in/wp-content/uploads/2026/06/minister_envt.png"
    },
    {
      name: "Jb. Shahal Hassan Musaliar",
      role: "Chairman, TKM Trust",
      image: "https://img1.wsimg.com/isteam/ip/dbca240c-c790-439b-bfb4-1ad9310347f4/1-1.png/:/cr=t:1.59%25,l:0%25,w:100%25,h:96.82%25/rs=w:472,h:629,cg:true"
    },
  ];

  const directors = [
    {
      name: "Dr. Sadiq A",
      role: "Principal of TKMCE Kollam",
      image: "https://tkmce.ac.in/images/Dr.%20SADIQ,%20A%20(1).jpg"
    },
    {
      name: "Haritha C",
      role: "Chairperson, Campus Sustainability Council(CSC), TKMCE Kollam",
      image: "https://dap.tkmce.ac.in/wp-content/uploads/2025/02/HARITHA-C.webp"
    },
    {
      name: "Basithali E. K.",
      role: "Founder of naamearth",
      image: "https://www.naamearth.in/images/people/basith_ali.jpg",
      imgClass: "scale-200"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".person-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".people-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1E2523] text-[#F3EFE6] px-6 md:px-10 lg:px-16 py-32 border-t border-white/10"
    >
      <div className="mb-20 max-w-6xl mx-auto">
        <p className="people-title text-xs tracking-[0.3em] text-[#287A73] mb-4 uppercase font-medium">
          04 / THE PEOPLE BEHIND
        </p>
        <h2 className="people-title text-4xl md:text-6xl font-light tracking-tight mb-16">
          Conclave Leadership
        </h2>
      </div>

      <div className="people-grid max-w-6xl mx-auto flex flex-col gap-24">
        {/* ADVISORS */}
        <div>
          <h3 className="text-xl md:text-2xl font-light text-[#D8C7A5] mb-12 border-b border-white/10 pb-4 text-center md:text-left">
            Conclave Advisors
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12 md:gap-24">
            {advisors.map((person, idx) => (
              <div key={idx} className="person-card group flex flex-col items-center text-center max-w-sm">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/5 border border-white/10 mb-6 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  {/* PROFILE PLACEHOLDER */}
                  {person.image ? (
                    <img src={person.image} alt={person.name} className={`w-full h-full ${person.contain ? 'object-contain p-6' : 'object-cover'}`} />
                  ) : (
                    <span className="text-4xl text-white/20 font-light uppercase">{person.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xl md:text-2xl font-medium tracking-wide text-white group-hover:text-[#287A73] transition-colors">
                  {person.name}
                </span>
                <span className="text-xs md:text-sm tracking-widest text-[#8C877D] mt-2 uppercase">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DIRECTORS */}
        <div>
          <h3 className="text-xl md:text-2xl font-light text-[#D8C7A5] mb-12 border-b border-white/10 pb-4 text-center md:text-left">
            Conclave Directors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            {directors.map((person, idx) => (
              <div key={idx} className="person-card group flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/5 border border-white/10 mb-6 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  {/* PROFILE PLACEHOLDER */}
                  {person.image ? (
                    <img src={person.image} alt={person.name} className={`w-full h-full object-cover ${person.imgClass || ""}`} />
                  ) : (
                    <span className="text-4xl text-white/20 font-light uppercase">{person.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xl md:text-2xl font-medium tracking-wide text-white group-hover:text-[#287A73] transition-colors">
                  {person.name}
                </span>
                <span className="text-xs md:text-sm tracking-widest text-[#8C877D] mt-2 uppercase">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeopleBehind;
