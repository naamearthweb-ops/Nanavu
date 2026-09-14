import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "./ImagePlaceholder";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      if (!track) return;

      // ==========================================
      // HORIZONTAL SCROLL
      // ==========================================

      const getDistance = () =>
        Math.max(
          0,
          track.scrollWidth - window.innerWidth
        );

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",

          // Much shorter scroll distance
          end: () => `+=${getDistance() * 0.55}`,

          scrub: 0.8,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // PANEL ANIMATIONS
      // ==========================================

      const panels = gsap.utils.toArray(
        ".experience-panel"
      );

      panels.forEach((panel) => {
        const image = panel.querySelector(
          ".experience-image"
        );

        const content = panel.querySelector(
          ".experience-content"
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.06,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",

              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            {
              y: 35,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative
        bg-nanavu-charcoal
        text-nanavu-offwhite
      "
    >

      {/* ==================================================
          DESKTOP
      ================================================== */}

      <div
        ref={trackRef}
        className="
          hidden
          md:flex
          h-screen
          w-max
        "
      >

        {/* ==================================================
            INTRO
        ================================================== */}

        <div
          className="
            experience-panel
            relative
            w-screen
            h-screen
            flex-shrink-0
            px-12
            lg:px-20
            py-12
            flex
            flex-col
            justify-between
          "
        >

          {/* TOP */}

          <div
            className="
              flex
              justify-between
              items-start
            "
          >

            <span
              className="
                text-[10px]
                tracking-[0.4em]
                text-nanavu-sand
              "
            >
              04 / EXPERIENCE
            </span>

            <span
              className="
                text-[10px]
                tracking-[0.3em]
                text-nanavu-stone
              "
            >
              SCROLL TO EXPLORE →
            </span>

          </div>


          {/* CENTER */}

          <div>

            <p
              className="
                mb-7
                text-xs
                tracking-[0.3em]
                text-nanavu-stone
              "
            >
              ENTER THE WORLD OF NANAVU
            </p>

            <h2
              className="
                text-[13vw]
                lg:text-[11vw]
                leading-[0.75]
                tracking-[-0.07em]
                font-light
              "
            >
              THE
              <br />
              EXPERIENCE
            </h2>

          </div>


          {/* BOTTOM */}

          <div
            className="
              flex
              justify-between
              items-end
            "
          >

            <span
              className="
                text-xs
                tracking-[0.2em]
                text-nanavu-stone
              "
            >
              01 — 04
            </span>

            <span
              className="
                text-3xl
                text-nanavu-teal
              "
            >
              →
            </span>

          </div>

        </div>


        {/* ==================================================
            01 - PANEL DISCUSSION
        ================================================== */}

        <div
          className="
            experience-panel
            relative
            w-[80vw]
            h-screen
            flex-shrink-0
            px-12
            lg:px-16
            flex
            items-center
          "
        >

          <div
            className="
              w-full
              grid
              grid-cols-12
              gap-8
              items-center
            "
          >

            {/* TEXT */}

            <div
              className="
                experience-content
                col-span-5
              "
            >

              <span
                className="
                  text-xs
                  tracking-[0.3em]
                  text-nanavu-sand
                  font-medium
                "
              >
                01 / PANEL DISCUSSION
              </span>

              <h3
                className="
                  mt-4
                  text-[4.5vw]
                  leading-[0.9]
                  tracking-[-0.05em]
                  font-light
                  text-nanavu-teal
                "
              >
                IDEAS IN DIALOGUE
              </h3>

              <p className="mt-2 text-sm text-[#C99A72] tracking-wider uppercase font-medium">
                Perspectives in Focus
              </p>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-sm
                  lg:text-base
                  leading-relaxed
                  text-nanavu-offwhite/70
                "
              >
                Exploring the growing scope of sustainable construction, emerging career pathways, and connecting education with real-world practice for young professionals.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-nanavu-stone">
                <span className="text-[#D8C7A5]">GUEST SPEAKERS:</span> Ar. Vinu Daniel (Wallmakers) & Ar. Eugene Pandala (CSBNE)
              </div>

            </div>


            {/* IMAGE */}

            <div
              className="
                col-span-7
                col-start-6
              "
            >

              <div
                className="
                  experience-image
                  relative
                  h-[55vh]
                  w-full
                  overflow-hidden
                "
              >
                <ImagePlaceholder
                  label="Panel Discussion: Ideas in Dialogue & Career Pathways"
                  category="TRACK 01 PLACEHOLDER"
                  aspect="h-full"
                />
              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            02 - TECHNICAL SESSIONS
        ================================================== */}

        <div
          className="
            experience-panel
            relative
            w-[80vw]
            h-screen
            flex-shrink-0
            px-12
            lg:px-16
            flex
            items-center
          "
        >

          <div
            className="
              w-full
              grid
              grid-cols-12
              gap-8
              items-center
            "
          >

            {/* IMAGE */}

            <div className="col-span-7">

              <div
                className="
                  experience-image
                  relative
                  h-[55vh]
                  w-full
                  overflow-hidden
                "
              >
                <ImagePlaceholder
                  label="Technical Sessions: Natural Materials & CSEB Building"
                  category="TRACK 02 PLACEHOLDER"
                  aspect="h-full"
                />
              </div>

            </div>


            {/* TEXT */}

            <div
              className="
                experience-content
                col-span-5
                col-start-8
              "
            >

              <span
                className="
                  text-xs
                  tracking-[0.3em]
                  text-nanavu-sand
                  font-medium
                "
              >
                02 / TECHNICAL SESSIONS
              </span>

              <h3
                className="
                  mt-4
                  text-[4.5vw]
                  leading-[0.9]
                  tracking-[-0.05em]
                  font-light
                  text-nanavu-clay
                "
              >
                KNOWLEDGE THAT DRIVES
              </h3>

              <p className="mt-2 text-sm text-[#D8C7A5] tracking-wider uppercase font-medium">
                Innovation & Engineering
              </p>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-sm
                  lg:text-base
                  leading-relaxed
                  text-nanavu-offwhite/70
                "
              >
                Technical sessions led by practicing professionals introducing students to natural construction techniques, Compressed Stabilised Earth Blocks (CSEB), filler slabs, and climate resilience.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-nanavu-stone">
                <span className="text-[#D8C7A5]">GUEST SPEAKERS:</span> Madhavan Namboothiri (Clean Tech) & Ar. P.B. Sajan (COSTFORD)
              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            03 - SUSTAINABLE EXPO
        ================================================== */}

        <div
          className="
            experience-panel
            relative
            w-[80vw]
            h-screen
            flex-shrink-0
            px-12
            lg:px-16
            flex
            items-center
          "
        >

          <div
            className="
              w-full
              grid
              grid-cols-12
              gap-8
              items-center
            "
          >

            {/* TEXT */}

            <div
              className="
                experience-content
                col-span-5
              "
            >

              <span
                className="
                  text-xs
                  tracking-[0.3em]
                  text-nanavu-sand
                  font-medium
                "
              >
                03 / SUSTAINABLE EXPO
              </span>

              <h3
                className="
                  mt-4
                  text-[4.5vw]
                  leading-[0.9]
                  tracking-[-0.05em]
                  font-light
                  text-nanavu-sand
                "
              >
                EXPLORE IDEAS
              </h3>

              <p className="mt-2 text-sm text-[#287A73] tracking-wider uppercase font-medium">
                Experience Innovation
              </p>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-sm
                  lg:text-base
                  leading-relaxed
                  text-nanavu-offwhite/70
                "
              >
                An interactive showcase of architectural models, bio-based products, and sustainable technologies demonstrating how green building works without compromising quality or strength.
              </p>

            </div>


            {/* IMAGE */}

            <div
              className="
                col-span-7
                col-start-6
              "
            >

              <div
                className="
                  experience-image
                  relative
                  h-[55vh]
                  w-full
                  overflow-hidden
                "
              >
                <ImagePlaceholder
                  label="Sustainable Building & Materials Expo Showcase"
                  category="TRACK 03 PLACEHOLDER"
                  aspect="h-full"
                />
              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            04 - IDEATHON
        ================================================== */}

        <div
          className="
            experience-panel
            relative
            w-[80vw]
            h-screen
            flex-shrink-0
            px-12
            lg:px-16
            flex
            items-center
          "
        >

          <div
            className="
              w-full
              grid
              grid-cols-12
              gap-8
              items-center
            "
          >

            {/* IMAGE */}

            <div className="col-span-7">

              <div
                className="
                  experience-image
                  relative
                  h-[55vh]
                  w-full
                  overflow-hidden
                "
              >
                <ImagePlaceholder
                  label="Student Ideathon: Thinking Bold & Creating Change"
                  category="TRACK 04 PLACEHOLDER"
                  aspect="h-full"
                />
              </div>

            </div>


            {/* TEXT */}

            <div
              className="
                experience-content
                col-span-5
                col-start-8
              "
            >

              <span
                className="
                  text-xs
                  tracking-[0.3em]
                  text-nanavu-sand
                  font-medium
                "
              >
                04 / IDEATHON
              </span>

              <h3
                className="
                  mt-4
                  text-[4.5vw]
                  leading-[0.9]
                  tracking-[-0.05em]
                  font-light
                  text-[#D8C7A5]
                "
              >
                THINK BOLD
              </h3>

              <p className="mt-2 text-sm text-[#C99A72] tracking-wider uppercase font-medium">
                Create Change
              </p>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-sm
                  lg:text-base
                  leading-relaxed
                  text-nanavu-offwhite/70
                "
              >
                A dynamic platform for students to think creatively, engineer practical responses, and solve real-world campus & urban sustainability challenges.
              </p>

            </div>

          </div>


          {/* END */}

          <div
            className="
              absolute
              right-8
              bottom-8
            "
          >
            <span
              className="
                text-xs
                tracking-[0.25em]
                text-nanavu-teal
              "
            >
              CONTINUE →
            </span>
          </div>

        </div>

      </div>


      {/* ==================================================
          MOBILE
      ================================================== */}

      <div
        className="
          md:hidden
          px-6
          py-24
        "
      >

        {/* HEADER */}

        <div className="mb-20">

          <span
            className="
              text-[10px]
              tracking-[0.4em]
              text-nanavu-sand
            "
          >
            04 / EXPERIENCE
          </span>

          <h2
            className="
              mt-8
              text-[19vw]
              leading-[0.75]
              tracking-[-0.07em]
              font-light
            "
          >
            THE
            <br />
            EXPERIENCE
          </h2>

        </div>


        {/* MOBILE ITEMS */}

        {[
          {
            number: "01",
            title: "LISTEN",
            color: "text-nanavu-teal",
            text:
              "Stories, conversations and voices that make us stop and listen.",
          },
          {
            number: "02",
            title: "EXPLORE",
            color: "text-nanavu-clay",
            text:
              "Discover new perspectives, places, people and possibilities.",
          },
          {
            number: "03",
            title: "CREATE",
            color: "text-nanavu-sand",
            text:
              "Get involved, experiment and turn ideas into something real.",
          },
          {
            number: "04",
            title: "ACT",
            color: "text-nanavu-offwhite",
            text:
              "Take what you discover here and carry it into the world.",
          },
        ].map((item) => (
          <div
            key={item.number}
            className="mb-24"
          >

            <span
              className="
                text-xs
                tracking-[0.3em]
                text-nanavu-sand
              "
            >
              {item.number}
            </span>


            <h3
              className={`
                mt-5
                text-[19vw]
                leading-[0.8]
                tracking-[-0.06em]
                font-light
                ${item.color}
              `}
            >
              {item.title}
            </h3>


            {/* IMAGE */}

            <div
              className="
                relative
                mt-8
                w-full
                h-[48vh]
                overflow-hidden
              "
            >

              <img
                src="/experience.jpg"
                alt={`NANAVU ${item.title}`}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  left-5
                  bottom-5
                  px-3
                  py-2
                  bg-black/40
                  backdrop-blur-sm
                  text-[9px]
                  tracking-[0.3em]
                "
              >
                {item.title}
              </div>

            </div>


            {/* DESCRIPTION */}

            <p
              className="
                mt-7
                text-base
                leading-relaxed
                text-nanavu-offwhite/60
              "
            >
              {item.text}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Experience;