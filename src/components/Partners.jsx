import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Partners() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const logosRef = useRef(null);

  const partners = [
    {
      name: "CAMPUS SUSTAINABILITY COUNCIL",
      short: "CSC · TKMCE KOLLAM",
      role: "ORGANISING EXECUTIVE BODY",
      description: "Cross-disciplinary body embedding sustainability into campus learning, green audits, research, and industry collaboration.",
      logo: "/partners/csc-logo.png",
      url: "https://tkmce.ac.in",
    },
    {
      name: "NAAMEARTH SUSTAINABLE INITIATIVE",
      short: "NAAMEARTH",
      role: "CO-ORGANISER & SUSTAINABLE PARTNER",
      description: "Initiative advancing natural, regenerative, and ecological approaches to the built environment.",
      logo: "/partners/naamearth-logo.png",
      url: "https://www.naamearth.in",
    },
    {
      name: "TKM COLLEGE OF ENGINEERING",
      short: "TKMCE KOLLAM",
      role: "HOST INSTITUTION & ACADEMIC PARTNER",
      description: "First government-aided engineering college in Kerala (Estd. 1958), driving green campus innovation.",
      logo: "/partners/tkmce-logo.png",
      url: "https://tkmce.ac.in",
    },
    {
      name: "TKM COLLEGE TRUST",
      role: "GOVERNING BODY & SPONSORING TRUST",
      short: "TKM TRUST",
      description: "Pioneering educational trust empowering technical education, research, and social transformation.",
      logo: "/partners/tkm-trust.png",
      url: "https://tkmtrust.org",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      if (logosRef.current) {
        gsap.from(logosRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: logosRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative w-full bg-[#F3EFE6] text-[#29312F] px-6 md:px-10 lg:px-16 py-32"
    >
      {/* HEADER */}
      <div className="mb-24">
        <p className="text-xs tracking-[0.3em] text-[#287A73] mb-8 uppercase font-medium">
          07 / PARTNERS & ORGANISERS
        </p>

        <h2
          ref={titleRef}
          className="
            text-[12vw]
            md:text-[11vw]
            leading-[0.8]
            tracking-[-0.06em]
            font-light
          "
        >
          PARTNERS
        </h2>
      </div>

      {/* INTRO */}
      <div className="grid grid-cols-1 md:grid-cols-12 mb-24">
        <div className="md:col-span-4 mb-4 md:mb-0">
          <p className="text-xs tracking-[0.25em] text-[#8C877D] font-medium uppercase">
            BUILT TOGETHER
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="text-xl md:text-2xl leading-relaxed font-light text-[#29312F]">
            NANAVU is shaped through collaboration. Our partners help bring
            ideas, research, people and practical experiences together.
          </p>
        </div>
      </div>

      {/* LOGOS & DETAILS GRID (CLICKABLE PARTNER LINKS) */}
      <div
        ref={logosRef}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-x-10
          gap-y-16
        "
      >
        {partners.map((partner, index) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${partner.name}`}
            className="
              group
              relative
              min-h-[220px]
              border-t
              border-[#29312F]/20
              pt-8
              flex
              flex-col
              justify-between
              cursor-pointer
              transition-transform
              duration-300
              hover:-translate-y-1.5
            "
          >
            {/* NUMBER & EXTERNAL ICON */}
            <div className="flex justify-between items-center w-full absolute top-4 left-0 right-0">
              <span
                className="
                  text-[10px]
                  tracking-[0.2em]
                  text-[#8C877D]
                  font-medium
                "
              >
                0{index + 1}
              </span>
              <span className="text-[10px] text-[#287A73] opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wider">
                VISIT ↗
              </span>
            </div>

            {/* LOGO CONTAINER */}
            <div className="h-20 flex items-center justify-center py-2 px-4 mb-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="
                  max-h-16
                  max-w-[80%]
                  object-contain
                  grayscale
                  opacity-70
                  transition-all
                  duration-700
                  group-hover:grayscale-0
                  group-hover:opacity-100
                  group-hover:scale-105
                "
              />
            </div>

            {/* DETAILS */}
            <div className="text-center pt-2 border-t border-[#29312F]/10">
              <h3 className="text-base md:text-lg font-medium tracking-tight text-[#29312F] group-hover:text-[#287A73] transition-colors flex items-center justify-center gap-1">
                <span>{partner.name}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </h3>

              <p className="text-[9px] tracking-[0.2em] text-[#287A73] font-medium uppercase mt-1">
                {partner.role}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[#8C877D] max-w-xs mx-auto">
                {partner.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-32 flex justify-between items-center border-t border-[#29312F]/20 pt-6">
        <span className="text-xs tracking-[0.25em] text-[#8C877D] uppercase">
          IN COLLABORATION WITH NAAMEARTH, TKM COLLEGE & TKM COLLEGE TRUST
        </span>

        <span className="text-xs tracking-[0.25em] text-[#287A73]">
          08 / IMPACT →
        </span>
      </div>
    </section>
  );
}

export default Partners;