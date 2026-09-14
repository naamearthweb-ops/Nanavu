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
        bg-nanavu-offwhite
        text-nanavu-charcoal
        px-8
        md:px-16
        py-32
      "
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
                text-base
                md:text-lg
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              NANAVU is a national-level sustainable conclave exploring how sustainable and natural construction can become a practical, affordable, accessible, and rewarding pathway for the next generation of professionals.
            </p>

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                md:text-lg
                leading-relaxed
                text-nanavu-deepstone
              "
            >
              Moving beyond sustainability as a theoretical concept, NANAVU creates a vibrant platform for knowledge exchange, practical learning, innovation, and industry-wide collaboration.
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
            md:grid-cols-2
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
                max-w-lg
              "
            >
              To nurture a future where sustainable construction is accessible, practical, valued, and a rewarding professional pathway for young architects and engineers.
            </p>

          </div>


          {/* MISSION */}

          <div className="mission-content">

            <h3
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
            </p>

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
              01 / PRACTICAL & AFFORDABLE
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
              02 / EXPERIENTIAL LEARNING
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
              03 / NET-ZERO COMMITMENT
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

    </section>
  );
}

export default Introduction;  