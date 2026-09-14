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
      number: "01",
      title: "PEOPLE & CAREERS",
      description:
        "Connecting student education with real-world sustainable construction, opening rewarding career pathways for young architects and engineers.",
    },
    {
      number: "02",
      title: "PLANET & MATERIALS",
      description:
        "Advancing low-carbon building technologies, Compressed Stabilised Earth Blocks (CSEB), bamboo masonry, and regenerative natural materials.",
    },
    {
      number: "03",
      title: "CAMPUS & POLICY",
      description:
        "Empowering green campus audits, experiential learning, and institution-wide practices aligned with Kerala's Carbon-Neutral Vision.",
    },
    {
      number: "04",
      title: "PRACTICE & RESEARCH",
      description:
        "Bridging theoretical classroom knowledge with hands-on field experimentation, research publications, and sustainable design practice.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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
          opacity: 0,
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
          <span className="text-xs tracking-[0.3em] text-[#D8C7A5]">
            05 / IMPACT
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
            <span
              className="
                absolute
                top-4
                right-3
                md:right-5
                text-[9px]
                tracking-[0.2em]
                text-[#8C877D]
              "
            >
              0{index + 1}
            </span>

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
        {impactAreas.map((item) => (
          <div
            key={item.number}
            className="
              group
              grid
              grid-cols-12
              gap-4
              md:gap-8
              py-6
              md:py-8
              border-b
              border-[#F3EFE6]/20
              transition-all
              duration-300
              hover:bg-white/5
              px-2
            "
          >
            <div className="col-span-2 md:col-span-1">
              <span className="text-xs tracking-[0.2em] text-[#287A73] font-medium">
                {item.number}
              </span>
            </div>

            <div className="col-span-10 md:col-span-4">
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
                  text-[#8C877D]
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

      {/* CLOSING STATEMENT */}
      <div
        className="
          mt-10
          md:mt-12
          grid
          grid-cols-1
          md:grid-cols-12
          gap-6
        "
      >
        <div className="md:col-span-8">
          <p
            className="
              text-2xl
              md:text-4xl
              lg:text-5xl
              leading-[0.95]
              tracking-[-0.04em]
              font-light
            "
          >
            SMALL MOMENTS.
            <br />
            <span className="text-[#D8C7A5] italic">BIGGER CHANGE.</span>
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <p className="text-xs leading-relaxed text-[#8C877D]">
            Every discussion, demonstration, and hands-on experience contributes to Kerala's net-zero movement.
          </p>
        </div>
      </div>

      {/* NEXT SECTION INDICATOR */}
      <div className="mt-10 md:mt-12 border-t border-[#F3EFE6]/15 pt-4 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] text-[#8C877D] uppercase">
          MEASURED IN MOMENTS
        </span>

        <span className="text-xs tracking-[0.25em] text-[#D8C7A5]">
          06 / JOIN NANAVU →
        </span>
      </div>
    </section>
  );
}

export default Impact;