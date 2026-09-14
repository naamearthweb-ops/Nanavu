import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Workshops() {
  const sectionRef = useRef(null);
  const [activeWorkshop, setActiveWorkshop] = useState(null);

  const workshops = [
    {
      number: "01",
      title: "NATURAL & REGENERATIVE CONSTRUCTION",
      category: "TECHNICAL SESSION",
      date: "CONCLAVE DAY",
      time: "10:00 AM",
      duration: "2.5 HOURS",
      mentor: "AR. VINU DANIEL & AR. EUGENE PANDALA",
      description:
        "Hands-on technical session exploring Compressed Stabilised Earth Blocks (CSEB), cob construction, mud masonry, and upcycled scrap architecture in real-world practice.",
    },
    {
      number: "02",
      title: "LOW-CARBON & AFFORDABLE HOUSING",
      category: "TECHNICAL SESSION",
      date: "CONCLAVE DAY",
      time: "02:00 PM",
      duration: "2.5 HOURS",
      mentor: "AR. P.B. SAJAN & MADHAVAN NAMBOOTHIRI",
      description:
        "Practical engineering applications of rat-trap bond masonry, filler slab roofing systems, bamboo structural engineering, and bioenergy transitions.",
    },
    {
      number: "03",
      title: "SUSTAINABLE BUILDING MATERIALS EXPO",
      category: "INTERACTIVE EXPO",
      date: "CONCLAVE DAY",
      time: "09:30 AM",
      duration: "ALL DAY",
      mentor: "NAAMEARTH & CSC TKMCE",
      description:
        "An interactive exhibition showcasing alternative building products, earth models, bio-composites, and low-carbon construction innovations.",
    },
    {
      number: "04",
      title: "SUSTAINABILITY IDEATHON CHALLENGE",
      category: "STUDENT COMPETITION",
      date: "CONCLAVE DAY",
      time: "11:00 AM",
      duration: "5 HOURS",
      mentor: "CSC TKMCE & INDUSTRY EXPERTS",
      description:
        "A competitive problem-solving hackathon for students to design practical solutions for real-world environmental and campus sustainability challenges.",
    },
  ];

  // ==========================================
  // GSAP REVEALS
  // ==========================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".workshops-label", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".workshops-title", {
        y: 90,
        opacity: 0,
        duration: 1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".workshops-intro", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const rows = gsap.utils.toArray(
        ".workshop-row"
      );

      rows.forEach((row, index) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // OPEN WORKSHOP
  // ==========================================

  const openWorkshop = (index) => {
    setActiveWorkshop(index);
  };

  const closeWorkshop = () => {
    setActiveWorkshop(null);
  };

  return (
    <section
      ref={sectionRef}
      id="workshops"
      className="
        relative
        overflow-hidden
        bg-[#29312F]
        text-[#F3EFE6]
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          px-6
          md:px-12
          lg:px-20

          pt-28
          md:pt-40

          pb-20
          md:pb-28
        "
      >

        {/* TOP LINE */}

        <div
          className="
            workshops-label

            flex
            justify-between
            items-center

            mb-10
          "
        >

          <span
            className="
              text-[10px]
              tracking-[0.4em]
              text-[#D8C7A5]
            "
          >
            06 / WORKSHOPS
          </span>

          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-[#8C877D]
            "
          >
            12 — 14 FEBRUARY 2027
          </span>

        </div>


        {/* TITLE */}

        <h2
          className="
            workshops-title

            text-[18vw]
            md:text-[13vw]
            lg:text-[11vw]

            leading-[0.75]

            tracking-[-0.075em]

            font-light
          "
        >
          WORKSHOPS
        </h2>


        {/* INTRO */}

        <div
          className="
            workshops-intro

            mt-12
            md:mt-16

            flex
            justify-end
          "
        >

          <p
            className="
              max-w-md

              text-sm
              md:text-base

              leading-relaxed

              text-[#F3EFE6]/60
            "
          >
            Come curious. Make something.
            Learn from people who think,
            create and work differently.
          </p>

        </div>

      </div>


      {/* =================================================
          WORKSHOP LIST
      ================================================= */}

      <div
        className="
          px-6
          md:px-12
          lg:px-20
        "
      >

        <div
          className="
            border-t
            border-[#F3EFE6]/20
          "
        >

          {workshops.map((workshop, index) => (
            <div
              key={workshop.number}
              onClick={() => openWorkshop(index)}
              className="
                workshop-row
                group
                relative

                cursor-pointer

                border-b
                border-[#F3EFE6]/20

                py-8
                md:py-10
                lg:py-12

                transition-colors
                duration-500

                hover:bg-[#287A73]/10
              "
            >

              {/* =================================================
                  DESKTOP ROW
              ================================================= */}

              <div
                className="
                  hidden
                  md:grid

                  grid-cols-12

                  gap-6

                  items-center
                "
              >

                {/* NUMBER */}

                <div
                  className="
                    col-span-1
                  "
                >

                  <span
                    className="
                      text-[10px]

                      tracking-[0.25em]

                      text-[#8C877D]

                      group-hover:text-[#D8C7A5]

                      transition-colors
                    "
                  >
                    {workshop.number}
                  </span>

                </div>


                {/* TITLE */}

                <div
                  className="
                    col-span-5
                  "
                >

                  <h3
                    className="
                      text-2xl
                      lg:text-4xl

                      font-light

                      tracking-[-0.04em]

                      transition-transform
                      duration-500

                      group-hover:translate-x-3
                    "
                  >
                    {workshop.title}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-[8px]

                      tracking-[0.25em]

                      text-[#8C877D]

                      group-hover:text-[#D8C7A5]

                      transition-colors
                    "
                  >
                    {workshop.category}
                  </p>

                </div>


                {/* DATE */}

                <div
                  className="
                    col-span-2
                  "
                >

                  <p
                    className="
                      text-sm
                    "
                  >
                    {workshop.date}
                  </p>

                  <p
                    className="
                      mt-1

                      text-[8px]

                      tracking-[0.2em]

                      text-[#8C877D]
                    "
                  >
                    {workshop.time}
                  </p>

                </div>


                {/* MENTOR */}

                <div
                  className="
                    col-span-2
                  "
                >

                  <p
                    className="
                      text-[8px]

                      tracking-[0.2em]

                      text-[#8C877D]
                    "
                  >
                    WITH
                  </p>

                  <p
                    className="
                      mt-1

                      text-sm
                    "
                  >
                    {workshop.mentor}
                  </p>

                </div>


                {/* ARROW */}

                <div
                  className="
                    col-span-2

                    flex
                    justify-end
                  "
                >

                  <div
                    className="
                      w-11
                      h-11

                      rounded-full

                      border
                      border-[#F3EFE6]/30

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-500

                      group-hover:bg-[#D8C7A5]
                      group-hover:text-[#29312F]
                      group-hover:border-[#D8C7A5]
                    "
                  >

                    <span
                      className="
                        text-lg

                        transition-transform
                        duration-500

                        group-hover:rotate-45
                      "
                    >
                      →
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  MOBILE ROW
              ================================================= */}

              <div
                className="
                  md:hidden
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                  "
                >

                  <span
                    className="
                      text-[9px]

                      tracking-[0.25em]

                      text-[#8C877D]
                    "
                  >
                    {workshop.number}
                  </span>

                  <span
                    className="
                      text-[8px]

                      tracking-[0.2em]

                      text-[#D8C7A5]
                    "
                  >
                    {workshop.date}
                  </span>

                </div>


                <div
                  className="
                    mt-5

                    flex
                    justify-between
                    items-center
                    gap-4
                  "
                >

                  <div>

                    <h3
                      className="
                        text-xl

                        font-light

                        tracking-[-0.03em]
                      "
                    >
                      {workshop.title}
                    </h3>

                    <p
                      className="
                        mt-2

                        text-[7px]

                        tracking-[0.2em]

                        text-[#8C877D]
                      "
                    >
                      {workshop.category}
                    </p>

                  </div>


                  <div
                    className="
                      w-9
                      h-9

                      flex
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#F3EFE6]/30
                    "
                  >
                    →
                  </div>

                </div>


                <div
                  className="
                    mt-5

                    flex
                    justify-between
                    items-center
                  "
                >

                  <span
                    className="
                      text-[8px]

                      tracking-[0.2em]

                      text-[#8C877D]
                    "
                  >
                    {workshop.time}
                  </span>

                  <span
                    className="
                      text-[8px]

                      tracking-[0.2em]

                      text-[#8C877D]
                    "
                  >
                    WITH {workshop.mentor}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* =================================================
          BOTTOM
      ================================================= */}

      <div
        className="
          px-6
          md:px-12
          lg:px-20

          py-10
          md:py-14
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
          "
        >

          <span
            className="
              text-[8px]

              tracking-[0.3em]

              text-[#8C877D]
            "
          >
            04 WORKSHOPS
          </span>

          <span
            className="
              text-[8px]

              tracking-[0.3em]

              text-[#D8C7A5]
            "
          >
            NEXT / PROGRAMME →
          </span>

        </div>

      </div>


      {/* =================================================
          WORKSHOP DETAIL OVERLAY
      ================================================= */}

      {activeWorkshop !== null && (
        <div
          className="
            fixed
            inset-0

            z-[100]

            bg-[#29312F]/95
            backdrop-blur-xl

            flex
            items-center
            justify-center

            px-6
            md:px-12
          "
        >

          <div
            className="
              relative

              w-full
              max-w-4xl

              bg-[#F3EFE6]
              text-[#29312F]

              p-7
              md:p-12
              lg:p-16
            "
          >

            {/* CLOSE */}

            <button
              onClick={closeWorkshop}
              className="
                absolute

                top-5
                right-5

                md:top-8
                md:right-8

                w-10
                h-10

                rounded-full

                border
                border-[#29312F]/20

                flex
                items-center
                justify-center

                text-lg

                transition-all
                duration-300

                hover:bg-[#29312F]
                hover:text-[#F3EFE6]
              "
            >
              ×
            </button>


            {/* NUMBER */}

            <span
              className="
                text-[9px]

                tracking-[0.3em]

                text-[#287A73]
              "
            >
              WORKSHOP{" "}
              {
                workshops[activeWorkshop]
                  .number
              }
            </span>


            {/* TITLE */}

            <h3
              className="
                mt-6

                max-w-3xl

                text-4xl
                md:text-6xl
                lg:text-7xl

                leading-[0.85]

                tracking-[-0.06em]

                font-light
              "
            >
              {
                workshops[activeWorkshop]
                  .title
              }
            </h3>


            {/* META */}

            <div
              className="
                mt-10

                grid
                grid-cols-2
                md:grid-cols-4

                gap-6

                border-t
                border-[#29312F]/20

                pt-6
              "
            >

              <div>

                <span
                  className="
                    text-[8px]

                    tracking-[0.2em]

                    text-[#8C877D]
                  "
                >
                  DATE
                </span>

                <p className="mt-2 text-sm">
                  {
                    workshops[
                      activeWorkshop
                    ].date
                  }
                </p>

              </div>


              <div>

                <span
                  className="
                    text-[8px]

                    tracking-[0.2em]

                    text-[#8C877D]
                  "
                >
                  TIME
                </span>

                <p className="mt-2 text-sm">
                  {
                    workshops[
                      activeWorkshop
                    ].time
                  }
                </p>

              </div>


              <div>

                <span
                  className="
                    text-[8px]

                    tracking-[0.2em]

                    text-[#8C877D]
                  "
                >
                  DURATION
                </span>

                <p className="mt-2 text-sm">
                  {
                    workshops[
                      activeWorkshop
                    ].duration
                  }
                </p>

              </div>


              <div>

                <span
                  className="
                    text-[8px]

                    tracking-[0.2em]

                    text-[#8C877D]
                  "
                >
                  WITH
                </span>

                <p className="mt-2 text-sm">
                  {
                    workshops[
                      activeWorkshop
                    ].mentor
                  }
                </p>

              </div>

            </div>


            {/* DESCRIPTION */}

            <p
              className="
                mt-10

                max-w-2xl

                text-sm
                md:text-base

                leading-relaxed

                text-[#29312F]/65
              "
            >
              {
                workshops[
                  activeWorkshop
                ].description
              }
            </p>


            {/* REGISTER */}

            <button
              className="
                mt-10

                inline-flex
                items-center
                gap-4

                rounded-full

                bg-[#287A73]

                px-7
                py-4

                text-[9px]

                tracking-[0.25em]

                text-[#F3EFE6]

                transition-all
                duration-300

                hover:px-9
              "
            >
              REGISTER

              <span className="text-sm">
                →
              </span>

            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Workshops;