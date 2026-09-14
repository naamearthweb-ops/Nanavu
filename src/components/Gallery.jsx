import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePlaceholder from "./ImagePlaceholder";

gsap.registerPlugin(ScrollTrigger);

function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const galleryRef = useRef(null);

  const images = [
    {
      src: "/gallery/cseb.jpg",
      title: "EARTH BLOCKS (CSEB)",
      location: "NATURAL MATERIALS",
      placeholderLabel: "Compressed Stabilised Earth Blocks (CSEB) Showcase",
    },
    {
      src: "/gallery/rat-trap.jpg",
      title: "RAT-TRAP MASONRY",
      location: "LOW-COST TECH",
      placeholderLabel: "Rat-Trap Bond & Filler Slab Model",
    },
    {
      src: "/gallery/bamboo.jpg",
      title: "BAMBOO PAVILION",
      location: "BIO-COMPOSITES",
      placeholderLabel: "Bamboo Structural Engineering Model",
    },
    {
      src: "/gallery/mud.jpg",
      title: "MUD & COB HOUSES",
      location: "ECO-ARCHITECTURE",
      placeholderLabel: "Organic Mud Architecture Model",
    },
    {
      src: "/gallery/ideathon.jpg",
      title: "IDEATHON PRESENTATIONS",
      location: "STUDENT INNOVATION",
      placeholderLabel: "Student Sustainability Ideathon Presentations",
    },
    {
      src: "/gallery/expo.jpg",
      title: "EXPO SHOWCASE",
      location: "SUSTAINABLE EXPO",
      placeholderLabel: "Sustainable Materials & Technologies Expo",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(introRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(galleryRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="
        relative
        w-full
        bg-[#F3EFE6]
        text-[#29312F]
        px-6
        md:px-10
        lg:px-16
        py-24
        md:py-28
        overflow-hidden
      "
    >
      {/* HEADER */}

      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs tracking-[0.3em] text-[#287A73]">
            09 / GALLERY
          </span>

          <div className="h-px w-16 bg-[#287A73]/40" />
        </div>

        <h2
          ref={titleRef}
          className="
            text-[12vw]
            md:text-[10vw]
            lg:text-[9vw]
            leading-[0.8]
            tracking-[-0.07em]
            font-medium
          "
        >
          GALLERY
        </h2>
      </div>

      {/* INTRO */}

      <div
        ref={introRef}
        className="
          grid
          grid-cols-1
          md:grid-cols-12
          gap-6
          mb-14
          md:mb-20
        "
      >
        <div className="md:col-span-4">
          <span className="text-xs tracking-[0.25em] text-[#8C877D]">
            MOMENTS FROM NANAVU
          </span>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p
            className="
              text-xl
              md:text-3xl
              lg:text-4xl
              leading-[1.1]
              tracking-[-0.03em]
            "
          >
            A collection of moments, people and places that make NANAVU what
            it is.
          </p>
        </div>
      </div>

      {/* GALLERY GRID */}

      <div
        ref={galleryRef}
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
          md:gap-6
          items-start
        "
      >
        {images.map((image, index) => (
          <div
            key={`${image.title}-${index}`}
            className={`
              group
              relative

              ${
                index === 1
                  ? "md:mt-16"
                  : index === 3
                  ? "md:mt-10"
                  : index === 5
                  ? "md:mt-20"
                  : ""
              }
            `}
          >
            {/* IMAGE */}

            <div
              className="
                relative
                overflow-hidden
                bg-[#D8C7A5]
                aspect-[4/3]
              "
            >
              <img
                src={image.src}
                alt={image.title}
                className="
                  w-full
                  h-full
                  object-cover
                  block
                  transition-transform
                  duration-[1000ms]
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Hover overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#287A73]/15
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* Number */}

              <span
                className="
                  absolute
                  top-3
                  left-3
                  text-[9px]
                  tracking-[0.2em]
                  text-white
                  mix-blend-difference
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* CAPTION */}

            <div className="flex justify-between items-start mt-2">
              <h3 className="text-[9px] md:text-[10px] tracking-[0.15em]">
                {image.title}
              </h3>

              <span className="text-[8px] tracking-[0.12em] text-[#8C877D]">
                {image.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM */}

      <div className="mt-16 md:mt-20 border-t border-[#29312F]/20 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.3em] text-[#8C877D]">
            KEEP EXPLORING
          </span>

          <span className="text-xs tracking-[0.25em] text-[#287A73]">
            10 / →
          </span>
        </div>
      </div>
    </section>
  );
}

export default Gallery;