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
      description: "Cross-disciplinary body embedding sustainability into campus learning, research, and industry collaboration.",
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

  const associatePartners = [
    {
      name: "COEARTH FOUNDATION",
      image: "https://scontent.cdninstagram.com/v/t51.2885-19/118232603_1017576338674128_5412317092891467450_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ssFyPeqQnMgQ7kNvwFYfWd9&_nc_oc=AdrX7UW-zIsDJiUqUsPUpZmAxvVh7OZzMzhejfw51MJfkAWmiH1IEIhXpTDDHeqn3NiWAIxMK3uextRXGqzhiLAV&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7b689&oh=00_AQJqNxgFqzhgB9G_KnZmH2aMtarZL7NzpMZ6Ovjes0LOJQ&oe=6AB5A81A",
      url: "https://www.instagram.com/coearthfoundation/",
      description: "A nonprofit organisation focused on sustainable architecture, construction, environment, and the built environment, bringing together students and professionals through workshops, training, research, and collaborative initiatives.",
    },
    {
      name: "SSA TKMCE",
      image: "https://scontent.cdninstagram.com/v/t51.82787-19/546223143_18075505496320842_5023859323970534395_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=100&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=RPNX2d-HVJkQ7kNvwFpvvKh&_nc_oc=AdqVqEZp1dp7Jmy6tMbi4wqvr-LPEKV1DMFqCt-Eq2xKVPsrBTOhZFBI66RcF-b8vasEdWjsrf9QbGExq3p7dIlv&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=68mJVLlmeI3R2qTlsMA4Ew&_nc_ss=7b689&oh=00_AQIpucsccN1gonreSwlFAyLldJxuIk3Qw-kyrGKvnqopQA&oe=6AB5ABD0",
      url: "https://www.instagram.com/ssa.tkmce/",
      description: "The Society of Student Architects at TKMCE, serving as a platform for architecture students to engage in design, workshops, competitions, talks, exhibitions, and national-level architecture activities.",
    },
    {
      name: "IEI CIVIL TKMCE",
      image: "/iei_logo.jpeg",
      url: "https://www.instagram.com/iei.civil.tkmce/",
      description: "The Civil Engineering Student Chapter of the Institution of Engineers (India) at TKMCE, promoting technical knowledge and professional development through seminars, workshops, competitions, presentations, and industry-oriented activities.",
    }
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
          04 / PARTNERS & ORGANISERS
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

      {/* SUPPORTED BY SECTION */}
      <div className="mb-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        
        {/* FIRST ELEMENT: Ministry of AI and Entrepreneurship */}
        <div className="flex flex-col items-center justify-start gap-8 text-center px-4">
          {/* LOGO PLACEHOLDER */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-28 h-28 md:w-36 md:h-36 shrink-0 border border-[#29312F]/10 flex items-center justify-center rounded-full bg-white/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
          >
            <img src="/envtkeralaemblem.png" alt="Ministry Logo" className="w-full h-full object-contain p-5" />
          </a>
          
          {/* CONTENT */}
          <div className="flex flex-col items-center group">
            <p className="text-xs tracking-[0.3em] text-[#287A73] font-medium uppercase mb-4">
              Supported By
            </p>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-[#29312F] mb-4">
              Ministry of Industries & IT
            </h3>
            <p className="text-sm md:text-base text-[#8C877D] font-light mb-8 max-w-xs md:max-w-sm">
              Under the visionary leadership of <span className="font-medium text-[#29312F]">Shri P. K. Kunhalikutty</span>
            </p>
            {/* <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#287A73] hover:text-[#1d5c56] transition-all duration-300 border-b border-[#287A73]/30 hover:border-[#1d5c56] pb-1 uppercase font-medium group-hover:gap-3"
            >
              Visit kerala.gov.in ↗
            </a> */}
          </div>
        </div>

        {/* SECOND ELEMENT: Ministry of Climate Change */}
        <div className="flex flex-col items-center justify-start gap-8 text-center px-4">
          {/* LOGO PLACEHOLDER */}
          <a 
            href="https://envt.kerala.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-28 h-28 md:w-36 md:h-36 shrink-0 border border-[#29312F]/10 flex items-center justify-center rounded-full bg-white/50 shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
          >
            <img src="/envtkeralaemblem.png" alt="Ministry Logo" className="w-full h-full object-contain p-5" />
          </a>
          
          {/* CONTENT */}
          <div className="flex flex-col items-center group">
            <p className="text-xs tracking-[0.3em] text-[#287A73] font-medium uppercase mb-4">
              Supported By
            </p>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-[#29312F] mb-4">
              Ministry of Environment & Climate Change
            </h3>
            <p className="text-sm md:text-base text-[#8C877D] font-light mb-8 max-w-xs md:max-w-sm">
              Under the visionary leadership of <span className="font-medium text-[#29312F]">Shri Sunny Joseph</span>
            </p>
            {/* <a 
              href="https://envt.kerala.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#287A73] hover:text-[#1d5c56] transition-all duration-300 border-b border-[#287A73]/30 hover:border-[#1d5c56] pb-1 uppercase font-medium group-hover:gap-3"
            >
              Visit envt.kerala.gov.in ↗
            </a> */}
          </div>
        </div>
      </div>

      {/* LOGOS & DETAILS GRID (CLICKABLE PARTNER LINKS) */}
      <div
        ref={logosRef}
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          relative
          gap-x-12
          gap-y-16
          border-t
          border-[#29312F]/20
          max-w-6xl
          mx-auto
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
              pt-8
              flex
              flex-col
              items-center
              justify-start
              cursor-pointer
              transition-transform
              duration-300
              hover:-translate-y-1.5
              h-full
              w-full
              max-w-md
              mx-auto
            "
          >
            {/* NUMBER & EXTERNAL ICON */}
            <div className="flex justify-between items-center w-full absolute top-4 left-0 right-0 z-10 px-2">
              <span
                className="
                  text-[10px]
                  tracking-[0.2em]
                  text-[#8C877D]
                  font-medium
                "
              >
              </span>
              <span className="text-[10px] text-[#287A73] opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wider">
                VISIT ↗
              </span>
            </div>

            {/* LOGO CONTAINER */}
            <div className="flex items-center justify-center py-2 px-4 mb-8 h-28 w-full border-t border-transparent">
              <div className="h-full flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="
                    h-full
                    w-auto
                    max-w-[140px]
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
            </div>

            {/* TEXT CONTAINER */}
            <div className="flex flex-col flex-1 w-full justify-between items-center px-4">
              {/* TOP PART: Heading and Role */}
              <div className="flex flex-col items-center justify-start w-full mb-6">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-[#29312F] group-hover:text-[#287A73] transition-colors text-center mb-3">
                  {partner.name}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-[#287A73] font-medium uppercase text-center leading-relaxed">
                  {partner.role}
                </p>
              </div>

              {/* BOTTOM PART: Description */}
              <div className="w-full flex items-end justify-center">
                <p className="text-sm leading-relaxed text-[#8C877D] max-w-sm text-center">
                  {partner.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ASSOCIATE PARTNERS & COMMUNITIES */}
      <div className="mt-32 max-w-5xl mx-auto border-t border-[#29312F]/20 pt-16">
        <h3 className="text-center text-xs tracking-[0.3em] text-[#287A73] font-medium uppercase mb-12">
          Associate Partners & Communities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
          {associatePartners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center group">
              {partner.image && (
                <a href={partner.url || "#"} target="_blank" rel="noopener noreferrer" className="mb-5 w-20 h-20 rounded-full overflow-hidden border border-[#29312F]/10 hover:scale-105 transition-transform duration-300 shadow-sm bg-white flex shrink-0">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                </a>
              )}
              <h4 className="text-sm md:text-base font-medium tracking-tight text-[#29312F] group-hover:text-[#287A73] transition-colors mb-3">
                {partner.url ? (
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5 justify-center">
                    {partner.name} <span className="text-[10px]">↗</span>
                  </a>
                ) : (
                  partner.name
                )}
              </h4>
              <p className="text-xs leading-relaxed text-[#8C877D]">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-32 flex justify-between items-center border-t border-[#29312F]/20 pt-6">
        <span className="text-xs tracking-[0.25em] text-[#8C877D] uppercase">
          IN COLLABORATION WITH NAAMEARTH, TKM COLLEGE & TKM COLLEGE TRUST
        </span>

        <span className="text-xs tracking-[0.25em] text-[#287A73]">
          06 / IMPACT →
        </span>
      </div>
    </section>
  );
}

export default Partners;
