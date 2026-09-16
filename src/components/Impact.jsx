import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Impact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statementRef = useRef(null);
  const statsRef = useRef(null);
  const impactRef = useRef(null);

  const stats = [
    {
      number: "250+",
      label: "STUDENTS & PROFESSIONALS",
    },
    {
      number: "4",
      label: "CORE CONCLAVE TRACKS",
    },
    {
      number: "2070",
      label: "INDIA NET ZERO ALIGNMENT",
    },
  ];

  const impactAreas = [
    {
      title: "NURTURE FUTURE PROFESSIONALS",
      description:
        "Empower a generation of professionals who integrate sustainability into construction thinking, design, and practice.",
    },
    {
      title: "CONNECT LEARNING WITH PRACTICE",
      description:
        "Enable experiential learning and practical exposure to sustainable materials, technologies, practices, and real-world applications.",
    },
    {
      title: "BUILD ADAPTIVE & INNOVATIVE CAPACITY",
      description:
        "Encourage participants to explore, adapt, and apply sustainable solutions to diverse local contexts, resources, and construction needs.",
    },
    {
      title: "CREATE LASTING COLLABORATIONS & ACTION",
      description:
        "Connect education, industry, research, practice, and policy, enabling ideas from the Conclave to evolve into projects, initiatives, research, and professional collaborations.",
    },
    {
      title: "SHAPE THE FUTURE OF SUSTAINABLE CONSTRUCTION",
      description:
        "Contribute in the long term to making sustainable construction more accessible, practical, valued, and rewarding as a professional and entrepreneurial pathway, supporting the transition towards a more sustainable built environment.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      // changed
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Statement animation
      gsap.from(statementRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Stats animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Impact rows animation
      if (impactRef.current) {
        gsap.from(impactRef.current.children, {
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: impactRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="
        relative
        w-full
        bg-[#29312F]
        text-[#F3EFE6]
        px-6
        md:px-10
        lg:px-16
        py-16
        md:py-20
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="mb-10 md:mb-14">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs tracking-[0.3em] text-[#287A73]">
            06 / IMPACT
          </span>

          <div className="h-px w-16 bg-[#D8C7A5]/40" />
        </div>

        <h2
          ref={titleRef}
          className="
            text-[12vw]
            md:text-[10vw]
            lg:text-[8vw]
            leading-[0.85]
            tracking-[-0.06em]
            font-light
          "
        >
          IMPACT
        </h2>
      </div>

      {/* INTRODUCTION */}
      <div
        ref={statementRef}
        className="
          grid
          grid-cols-1
          md:grid-cols-12
          gap-6
          mb-12
          md:mb-16
        "
      >
        <div className="md:col-span-4">
          <span className="text-xs tracking-[0.25em] text-[#8C877D] uppercase font-medium">
            BEYOND THE CONCLAVE
          </span>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <p
            className="
              text-xl
              md:text-3xl
              lg:text-4xl
              leading-[1.15]
              tracking-[-0.02em]
              font-light
            "
          >
            We believe a sustainable conclave should leave a lasting footprint—an actionable technique, a professional connection, and a tangible shift towards carbon-neutral practices.
          </p>
        </div>
      </div>

      {/* IMPACT NUMBERS */}
      <div
        ref={statsRef}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          border-t
          border-[#F3EFE6]/20
          mb-12
          md:mb-16
        "
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="
              relative
              py-6
              md:py-8
              pr-4
              md:pr-8
              border-b
              md:border-b-0
              border-[#F3EFE6]/20
            "
          >
            <div
              className="
                text-[10vw]
                md:text-[5vw]
                lg:text-[4.5vw]
                leading-none
                tracking-[-0.05em]
                text-[#D8C7A5]
                font-light
              "
            >
              {stat.number}
            </div>

            <p
              className="
                mt-3
                text-[9px]
                md:text-xs
                tracking-[0.18em]
                text-[#8C877D]
                uppercase
              "
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* IMPACT AREAS */}
      <div className="mb-5">
        <span className="text-xs tracking-[0.3em] text-[#287A73] font-medium uppercase">
          WHERE IT MATTERS
        </span>
      </div>

      <div
        ref={impactRef}
        className="border-t border-[#F3EFE6]/20"
      >
        {impactAreas.map((item, index) => (
          <div
            key={index}
            className={`
              group
              grid
              grid-cols-12
              gap-4
              md:gap-8
              py-6
              md:py-8
              ${index !== impactAreas.length - 1 ? 'border-b border-[#F3EFE6]/20' : ''}
              transition-all
              duration-300
              hover:bg-white/5
              px-2
              items-start
            `}
          >
            <div className="col-span-1 flex justify-center pt-2 md:pt-3">
              <svg 
                className="w-3 h-3 md:w-4 md:h-4 text-[#287A73] transition-transform duration-700 group-hover:rotate-180 group-hover:text-[#D8C7A5]" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <div className="col-span-11 md:col-span-4">
              <h3
                className="
                  text-2xl
                  md:text-3xl
                  lg:text-4xl
                  leading-none
                  tracking-[-0.03em]
                  font-light
                  transition-colors
                  duration-300
                  group-hover:text-[#D8C7A5]
                "
              >
                {item.title}
              </h3>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-6 mt-1 md:mt-0">
              <p
                className="
                  text-xs
                  md:text-sm
                  leading-relaxed
                  text-[#C4C1B7]
                  max-w-xl
                "
              >
                {item.description}
              </p>
            </div>

            <div className="hidden md:flex col-span-1 justify-end items-center">
              <span
                className="
                  text-lg
                  text-[#287A73]
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                "
              >
                →
              </span>
            </div>
          </div>
        ))}
      </div>



      {/* NEXT SECTION INDICATOR */}
      <div className="mt-10 md:mt-12 border-t border-[#F3EFE6]/15 pt-4 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] text-[#8C877D] uppercase">
          MEASURED IN MOMENTS
        </span>

        <span className="text-xs tracking-[0.25em] text-[#287A73]">
          07 / GALLERY →
        </span>
      </div>
    </section>
  );
}

export default Impact;
