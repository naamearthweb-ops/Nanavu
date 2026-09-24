import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Introduction() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ==========================================
      // INTRO TEXT
      // ==========================================

      gsap.fromTo(
        ".intro-text",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-text",
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // ==========================================
      // INTRO NUMBER
      // ==========================================

      gsap.fromTo(
        ".intro-number",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-section",
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // ==========================================
      // MALAYALAM RANDOM BLINK REVEAL
      // ==========================================

      const malayalamLetters = gsap.utils.toArray(
        ".malayalam-letter"
      );

      gsap.set(malayalamLetters, {
        opacity: 0,
        scale: 0.8,
        y: 15,
      });

      // Random order
      const shuffledLetters = [...malayalamLetters].sort(
        () => Math.random() - 0.5
      );

      shuffledLetters.forEach((letter, index) => {
        const delay =
          index * 0.35 + Math.random() * 0.15;

        gsap.timeline({
          scrollTrigger: {
            trigger: ".malayalam-text",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
          // First blink
          .to(letter, {
            opacity: 0.15,
            duration: 0.08,
            delay,
          })

          // Blink off
          .to(letter, {
            opacity: 0,
            duration: 0.08,
          })

          // Blink again
          .to(letter, {
            opacity: 0.5,
            duration: 0.08,
          })

          // Final reveal
          .to(letter, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
      });

      // ==========================================
      // VISION + MISSION
      // ==========================================

      gsap.fromTo(
        ".vision-content, .mission-content",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ==========================================
      // MISSION PRINCIPLES
      // ==========================================

      gsap.fromTo(
        ".mission-principle",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-principles",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ==========================================
      // REFRESH SCROLLTRIGGER
      // ==========================================

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        intro-section
        relative
        overflow-hidden
        text-nanavu-charcoal
        px-8
        md:px-16
        py-32
      "
      style={{
        backgroundImage: 'linear-gradient(rgba(243, 239, 230, 0.85), rgba(243, 239, 230, 0.85)), url("/nanavu1.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >

      {/* ==========================================
          NUMBER
      ========================================== */}

      <div
        className="
          intro-number
          absolute
          top-16
          right-8
          md:right-16
        "
      >
        <span
          className="
            text-xs
            tracking-[0.3em]
            text-nanavu-stone
          "
        >
          01 / INTRODUCTION
        </span>
      </div>


      {/* ==========================================
          MALAYALAM TEXT
      ========================================== */}

      <div
        className="
          absolute
          top-32
          left-8
          md:left-16
        "
      >
        <p
          className="
            malayalam-text
            text-[18vw]
            md:text-[14vw]
            leading-none
            font-light
            text-nanavu-sand
            flex
          "
        >

          <span
            className="
              malayalam-letter
              inline-block
              opacity-0
            "
          >
            ന
          </span>

          <span
            className="
              malayalam-letter
              inline-block
              opacity-0
            "
          >
            ന
          </span>

          <span
            className="
              malayalam-letter
              inline-block
              opacity-0
            "
          >
            വ്
          </span>

        </p>
      </div>


      {/* ==========================================
          INTRODUCTION CONTENT
      ========================================== */}

      <div
        className="
          relative
          pt-56
          md:pt-72
        "
      >

        <div
          className="
            grid
            md:grid-cols-12
            gap-10
          "
        >

          {/* LEFT */}

          <div
            className="
              md:col-span-4
            "
          >
            <p
              className="
                text-xs
                tracking-[0.3em]
                text-nanavu-stone
              "
            >
              WHAT IS NANAVU?
            </p>
          </div>


          {/* RIGHT */}

          <div
            className="
              intro-text
              md:col-span-7
              md:col-start-5
            "
          >

            <h2
              className="
                text-4xl
                md:text-7xl
                font-light
                leading-[1.02]
                tracking-[-0.04em]
              "
            >
              Nurturing
              <br />
              <span className="text-nanavu-clay italic">
                the
              </span>
              <br />
              future
            </h2>

            <p
              className="
                mt-10
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              NANAVU is a national-level Sustainability Conclave exploring how sustainable construction can be empowered as a practical, affordable, accessible, and rewarding pathway for the next generation of professionals.
            </p>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              Bringing together education, industry, research, practice, and policy, NANAVU creates a platform to explore new materials, technologies, practices, and career opportunities that can make sustainable construction a preferred choice-without compromising quality, performance, or value.
            </p>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              Through panel discussions, technical talks, and student innovation, the Conclave aims to connect education with practice and turn ideas into collaboration, action, and long-term impact.
            </p>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              NANAVU contributes to the Kerala Carbon Neutral Pathway 2050 and India’s commitment to net-zero emissions by 2070.
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          VISION + MISSION
      ========================================== */}

      <div
        className="
          mt-40
          md:mt-48
        "
      >

        {/* SECTION LABEL */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-12
          "
        >

          <span
            className="
              w-8
              h-[1px]
              bg-nanavu-teal
            "
          />

          <span
            className="
              text-[10px]
              tracking-[0.35em]
              text-nanavu-stone
            "
          >
            02 / VISION & MISSION
          </span>

        </div>


        {/* VISION + MISSION */}

        <div
          className="
            grid
            grid-cols-1
            gap-16
            md:gap-24
            max-w-6xl
            ml-auto
          "
        >

          {/* VISION */}

          <div className="vision-content">

            <h3
              className="
                text-4xl
                md:text-6xl
                font-light
                tracking-[-0.04em]
                text-nanavu-teal
              "
            >
              Vision
            </h3>

            <p
              className="
                mt-6
                text-xl
                md:text-2xl
                leading-[1.25]
                font-light
                max-w-3xl
              "
            >
              To nurture a future where sustainable construction is accessible, practical, valued, and a rewarding professional pathway. </p>

          </div>


          {/* MISSION */}

          <div className="mission-content">

            {/* <h3
              className="
                text-4xl
                md:text-6xl
                font-light
                tracking-[-0.04em]
                text-nanavu-clay
              "
            >
              Mission
            </h3>

            <p
              className="
                mt-6
                text-xl
                md:text-2xl
                leading-[1.25]
                font-light
                max-w-lg
              "
            >
              To unite education, industry, research, practice, and policy—empowering students with hands-on knowledge, natural materials, and regenerative building practices.
            </p> */}

          </div>

        </div>


        {/* ==========================================
            MISSION PRINCIPLES
        ========================================== */}

        <div
          className="
            mission-principles
            mt-16
            pt-8
            border-t
            border-nanavu-charcoal/15
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
            max-w-6xl
            ml-auto
          "
        >

          {/* 01 */}

          <div className="mission-principle">

            <span
              className="
                text-[10px]
                tracking-[0.3em]
                text-nanavu-teal
                font-medium
              "
            >
              PRACTICAL & AFFORDABLE
            </span>

            <p
              className="
                mt-3
                text-sm
                md:text-base
                font-light
                text-nanavu-deepstone
              "
            >
              Demonstrate how natural construction works without compromising quality, performance, resilience, or aesthetic value.
            </p>

          </div>


          {/* 02 */}

          <div className="mission-principle">

            <span
              className="
                text-[10px]
                tracking-[0.3em]
                text-nanavu-teal
                font-medium
              "
            >
              EXPERIENTIAL LEARNING
            </span>

            <p
              className="
                mt-3
                text-sm
                md:text-base
                font-light
                text-nanavu-deepstone
              "
            >
              Engage directly with sustainable building technologies through hands-on workshops, ideathons, and interactive technical sessions.
            </p>

          </div>


          {/* 03 */}

          <div className="mission-principle">

            <span
              className="
                text-[10px]
                tracking-[0.3em]
                text-nanavu-teal
                font-medium
              "
            >
              NET-ZERO COMMITMENT
            </span>

            <p
              className="
                mt-3
                text-sm
                md:text-base
                font-light
                text-nanavu-deepstone
              "
            >
              Align campus learning and real-world practice with Kerala's Carbon-Neutral Vision and India's Net Zero 2070 goals.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          ABOUT ORGANIZERS
      ========================================== */}
      <div className="organizer-blocks-container mt-32 md:mt-40 w-full max-w-7xl mx-auto border-t border-nanavu-charcoal/15 pt-20">
         <div className="flex items-center gap-4 mb-16">
          <span className="w-8 h-[1px] bg-nanavu-teal" />
          <span className="text-[10px] tracking-[0.35em] text-nanavu-stone">03 / THE ORGANIZERS</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TKMCE CARD */}
            <a href="https://tkmce.ac.in" target="_blank" rel="noopener noreferrer" className="organizer-block group p-8 rounded-2xl border border-nanavu-charcoal/10 hover:border-nanavu-clay/30 hover:shadow-lg hover:shadow-nanavu-clay/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden block">
               {/* LOGO PLACEHOLDER */}
               <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-nanavu-clay/20 bg-white/50 backdrop-blur-md flex items-center justify-center overflow-hidden z-20 shadow-sm group-hover:scale-105 transition-transform duration-500">
                 <img src="/partners/tkmce-logo.png" alt="TKMCE Logo" className="w-full h-full object-contain p-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
               </div>

               {/* BACKGROUND IMAGE & OVERLAY */}
               <div 
                 className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 bg-cover bg-center grayscale group-hover:grayscale-0"
                 style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIpQoy9W1t2oyWsErdyLF3TF65ZsROPCx8-Fw5PzkCqjMM8LFiUfRZ8Lv&s=10")` }}
               />
               <div className="absolute inset-0 z-0 bg-[#F3EFE6]/80 group-hover:bg-[#F3EFE6]/60 transition-colors duration-700" />
               
               {/* CONTENT */}
               <div className="w-10 h-10 rounded-full border border-nanavu-clay/20 flex items-center justify-center mb-6 bg-nanavu-clay/10 text-nanavu-clay group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <span className="text-xs tracking-widest font-medium">01</span>
               </div>
               <h3 className="text-2xl font-light tracking-wide text-nanavu-clay mb-4 relative z-10 drop-shadow-sm flex items-center gap-2">
                 TKMCE <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">↗</span>
               </h3>
               <p className="text-sm leading-relaxed text-nanavu-deepstone relative z-10 font-medium">
                 <span className="font-semibold text-nanavu-clay/90">Thangal Kunju Musaliar College of Engineering (TKMCE)</span>, founded in 1958, is a premier technical institution and the first government-aided engineering college in Kerala's private sector. With a legacy of over six decades, TKMCE is committed to academic excellence, innovation, and shaping the next generation of engineers and leaders.
               </p>
            </a>
            
            {/* CSC CARD */}
            <a href="https://tkmce.ac.in" target="_blank" rel="noopener noreferrer" className="organizer-block group p-8 rounded-2xl border border-nanavu-charcoal/10 hover:border-nanavu-plant/30 hover:bg-white/30 hover:shadow-lg hover:shadow-nanavu-plant/5 transition-all duration-500 backdrop-blur-sm flex flex-col h-full relative overflow-hidden block">
               {/* LOGO PLACEHOLDER */}
               <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-nanavu-plant/20 bg-white/50 backdrop-blur-md flex items-center justify-center overflow-hidden z-20 shadow-sm group-hover:scale-105 transition-transform duration-500">
                 <img src="/partners/csc-logo.png" alt="CSC Logo" className="w-full h-full object-contain p-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
               </div>

               <div className="w-10 h-10 rounded-full border border-nanavu-plant/20 flex items-center justify-center mb-6 bg-nanavu-plant/5 text-nanavu-plant group-hover:scale-110 transition-transform duration-500">
                  <span className="text-xs tracking-widest font-medium">02</span>
               </div>
               <h3 className="text-2xl font-light tracking-wide text-nanavu-plant mb-4 relative z-10 flex items-center gap-2">
                 CSC <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">↗</span>
               </h3>
               <p className="text-sm leading-relaxed text-nanavu-deepstone relative z-10">
                 <span className="font-medium text-nanavu-plant/90">The Campus Sustainability Council (CSC)</span>, TKMCE is a body comprising faculty, students, and industry experts, established to drive action-based sustainability transformation across TKMCE. The Council aims to transform the mindset of the campus towards sustainability through collective action, learning, innovation, and collaboration.
               </p>
            </a>
            
            {/* NAAMEARTH CARD */}
            <a href="https://www.naamearth.in" target="_blank" rel="noopener noreferrer" className="organizer-block group p-8 rounded-2xl border border-nanavu-charcoal/10 hover:border-nanavu-teal/50 hover:bg-white/30 hover:shadow-lg hover:shadow-nanavu-teal/10 transition-all duration-500 backdrop-blur-sm flex flex-col h-full relative overflow-hidden block">
               {/* LOGO PLACEHOLDER */}
               <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-nanavu-teal/40 bg-white/50 backdrop-blur-md flex items-center justify-center overflow-hidden z-20 shadow-sm group-hover:scale-105 transition-transform duration-500">
                 <img src="/partners/naamearth-logo.png" alt="NAAMEARTH Logo" className="w-full h-full object-contain p-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
               </div>

               <div className="w-10 h-10 rounded-full border border-nanavu-teal/40 flex items-center justify-center mb-6 bg-nanavu-teal/10 text-nanavu-teal group-hover:scale-110 transition-transform duration-500">
                  <span className="text-xs tracking-widest font-medium">03</span>
               </div>
               <h3 className="text-2xl font-light tracking-wide text-nanavu-teal mb-4 relative z-10 flex items-center gap-2">
                 NAAMEARTH <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">↗</span>
               </h3>
               <p className="text-sm leading-relaxed text-nanavu-deepstone relative z-10">
                 <span className="font-medium text-nanavu-teal/90">Naamearth</span> is a sustainability-driven initiative dedicated to advancing natural, regenerative, and responsible approaches to sustainability. It combines traditional knowledge, contemporary engineering, research, and hands-on practice to explore solutions that are ecological, affordable, resilient, and relevant to the future of construction.
               </p>
            </a>
         </div>
      </div>

    </section>
  );
}

export default Introduction;  