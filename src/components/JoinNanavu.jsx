import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function JoinNanavu() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const optionsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER
      gsap.from(".join-label", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // TITLE
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // CONTENT
      gsap.from(contentRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // OPTIONS
      gsap.from(optionsRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: optionsRef.current,
          start: "top 85%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className="
        relative
        overflow-hidden
        bg-nanavu-offwhite
        text-nanavu-charcoal
        px-6
        md:px-12
        lg:px-20
        pt-24
        md:pt-32
        pb-12
        md:pb-16
      "
    >
      {/* HEADER */}
      <div
        className="
          join-label
          flex
          items-center
          justify-between
          mb-16
          md:mb-20
        "
      >
        <div className="flex items-center gap-4">
          <span
            className="
              text-[10px]
              tracking-[0.4em]
              text-nanavu-teal
            "
          >
            06 / JOIN NANAVU
          </span>

          <div className="h-px w-16 bg-nanavu-teal/40" />
        </div>

        <span
          className="
            text-[9px]
            tracking-[0.3em]
            text-nanavu-stone
          "
        >
          NANAVU '26
        </span>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-12
          gap-8
        "
      >
        {/* TITLE */}
        <div className="md:col-span-8">
          <h2
            ref={titleRef}
            className="
              text-[12vw]
              md:text-[12vw]
              lg:text-[10vw]
              leading-[0.76]
              tracking-[-0.075em]
              font-light
            "
          >
            JOIN
            <br />
            <span className="text-nanavu-teal">
              NANAVU
            </span>
          </h2>
        </div>

        {/* DESCRIPTION & CTA */}
        <div
          ref={contentRef}
          className="
            md:col-span-4
            md:col-start-9
            md:self-end
            mt-12
            md:mt-0
          "
        >
          <p
            className="
              text-xl
              md:text-2xl
              lg:text-3xl
              leading-[1.12]
              tracking-[-0.025em]
            "
          >
            Be part of the conversations, experiences
            and ideas that make NANAVU possible.
          </p>

          <p
            className="
              mt-6
              max-w-sm
              text-sm
              leading-relaxed
              text-nanavu-deepstone
            "
          >
            Join the conclave as a participant, creator,
            volunteer or collaborator and become part of
            the NANAVU community.
          </p>

          {/* CTA LINK WITH PLACEHOLDER */}
          <a
            href="https://registration-link-placeholder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-6
              border
              border-nanavu-charcoal
              px-7
              py-4
              text-[10px]
              tracking-[0.22em]
              text-nanavu-charcoal
              transition-all
              duration-500

              hover:bg-nanavu-teal
              hover:border-nanavu-teal
              hover:text-nanavu-offwhite
            "
          >
            <span>
              REGISTER NOW
            </span>

            <span
              className="
                text-lg
                transition-transform
                duration-500
                group-hover:translate-x-2
              "
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* PARTICIPATION OPTIONS */}
      <div
        ref={optionsRef}
        className="
          mt-24
          md:mt-28
          grid
          grid-cols-1
          md:grid-cols-3
          border-t
          border-nanavu-charcoal/20
        "
      >
        {/* ATTEND */}
        <div
          className="
            py-7
            md:pr-8
            border-b
            md:border-b-0
            md:border-r
            border-nanavu-charcoal/20
          "
        >
          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-teal
            "
          >
            01
          </span>

          <h3
            className="
              mt-3
              text-xl
              font-light
              tracking-[-0.02em]
            "
          >
            ATTEND
          </h3>

          <p
            className="
              mt-2
              max-w-xs
              text-xs
              leading-relaxed
              text-nanavu-stone
            "
          >
            Experience the conclave and discover
            everything NANAVU has to offer.
          </p>
        </div>

        {/* PARTICIPATE */}
        <div
          className="
            py-7
            md:px-8
            border-b
            md:border-b-0
            md:border-r
            border-nanavu-charcoal/20
          "
        >
          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-teal
            "
          >
            02
          </span>

          <h3
            className="
              mt-3
              text-xl
              font-light
              tracking-[-0.02em]
            "
          >
            PARTICIPATE
          </h3>

          <p
            className="
              mt-2
              max-w-xs
              text-xs
              leading-relaxed
              text-nanavu-stone
            "
          >
            Join technical sessions, conversations and
            creative experiences.
          </p>
        </div>

        {/* COLLABORATE */}
        <div className="py-7 md:pl-8">
          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-teal
            "
          >
            03
          </span>

          <h3
            className="
              mt-3
              text-xl
              font-light
              tracking-[-0.02em]
            "
          >
            COLLABORATE
          </h3>

          <p
            className="
              mt-2
              max-w-xs
              text-xs
              leading-relaxed
              text-nanavu-stone
            "
          >
            Bring your ideas, skills or organisation
            into the NANAVU journey.
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="
          mt-12
          md:mt-16
          border-t
          border-nanavu-charcoal/20
          pt-5
        "
      >
        <div className="flex items-center justify-between">
          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-stone
            "
          >
            CONCLAVE 2026
          </span>

          <span
            className="
              hidden
              md:block
              text-[9px]
              tracking-[0.3em]
              text-nanavu-stone
            "
          >
            TKMCE KOLLAM · KERALA · INDIA
          </span>

          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-teal
            "
          >
            07 / →
          </span>
        </div>
      </div>
    </section>
  );
}

export default JoinNanavu;