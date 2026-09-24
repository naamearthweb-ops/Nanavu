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

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Horizontal pin & scrub
      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance() * 0.8}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const panels = gsap.utils.toArray(".experience-panel");

      panels.forEach((panel, i) => {
        // Skip intro panel
        if (i === 0) return;

        const image = panel.querySelector(".experience-image");
        const content = panel.querySelector(".experience-content");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.06, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "left 85%", // Triggers based on horizontal left edge
                containerAnimation: horizontalTween,
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "left 85%", // Triggers based on horizontal left edge
                containerAnimation: horizontalTween,
                toggleActions: "play none none reverse",
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
    <section ref={sectionRef} id="experience" className="relative bg-nanavu-charcoal text-nanavu-offwhite">
      {/* DESKTOP */}
      <div ref={trackRef} className="hidden md:flex h-screen w-max">
        
        {/* INTRO */}
        <div className="experience-panel relative w-screen h-screen flex-shrink-0 px-12 lg:px-20 py-12 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] tracking-[0.4em] text-nanavu-sand">04 / EXPERIENCE</span>
            <span className="text-[10px] tracking-[0.3em] text-nanavu-stone">SCROLL TO EXPLORE →</span>
          </div>
          <div>
            <p className="mb-7 text-xs tracking-[0.3em] text-nanavu-stone">ENTER THE WORLD OF NANAVU</p>
            <h2 className="text-[13vw] lg:text-[11vw] leading-[0.75] tracking-[-0.07em] font-light">THE<br />EXPERIENCE</h2>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xs tracking-[0.2em] text-nanavu-stone">01 — 04</span>
            <span className="text-3xl text-nanavu-teal">→</span>
          </div>
        </div>

        {/* 01 - TECHNICAL SESSIONS */}
        <div className="experience-panel relative w-[80vw] h-screen flex-shrink-0 px-12 lg:px-16 flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 items-center">
            <div className="experience-content col-span-5">
              <span className="text-xs tracking-[0.3em] text-nanavu-sand font-medium">01 / TRACK ONE</span>
              <h3 className="mt-4 text-[4vw] leading-[0.9] tracking-[-0.05em] font-light text-nanavu-teal">
                TECHNICAL SESSIONS
              </h3>
              <p className="mt-2 text-sm text-[#C99A72] tracking-wider uppercase font-medium">Interactive & Expert-Led</p>
              <p className="mt-5 max-w-sm text-sm lg:text-base leading-relaxed text-nanavu-offwhite/70">
                Expert-led sessions on emerging materials, technologies, and practices in sustainable construction, with opportunities for interaction and knowledge exchange.
              </p>
            </div>
            <div className="col-span-7 col-start-6">
              <div className="experience-image relative h-[55vh] w-full overflow-hidden">
                <ImagePlaceholder label="Technical Sessions" category="TRACK 01" aspect="h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* 02 - PANEL DISCUSSION */}
        <div className="experience-panel relative w-[80vw] h-screen flex-shrink-0 px-12 lg:px-16 flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <div className="experience-image relative h-[55vh] w-full overflow-hidden">
                <ImagePlaceholder label="Panel Discussion" category="TRACK 02" aspect="h-full" />
              </div>
            </div>
            <div className="experience-content col-span-5 col-start-8">
              <span className="text-xs tracking-[0.3em] text-nanavu-sand font-medium">02 / TRACK TWO</span>
              <h3 className="mt-4 text-[4vw] leading-[0.9] tracking-[-0.05em] font-light text-nanavu-clay">
                PANEL DISCUSSION
              </h3>
              <p className="mt-2 text-sm text-[#D8C7A5] tracking-wider uppercase font-medium">Bridging Education and Practice</p>
              <p className="mt-5 max-w-sm text-sm lg:text-base leading-relaxed text-nanavu-offwhite/70">
                Why Sustainability Remains Optional in Construction — exploring the gap between education and professional practice and how sustainability can become integral to construction.
              </p>
            </div>
          </div>
        </div>

        {/* 03 - CONCEPT PITCHING */}
        <div className="experience-panel relative w-[80vw] h-screen flex-shrink-0 px-12 lg:px-16 flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 items-center">
            <div className="experience-content col-span-5">
              <span className="text-xs tracking-[0.3em] text-nanavu-sand font-medium">03 / TRACK THREE</span>
              <h3 className="mt-4 text-[4vw] leading-[0.9] tracking-[-0.05em] font-light text-nanavu-sand">
                CONCEPT PITCHING
              </h3>
              <p className="mt-2 text-sm text-[#287A73] tracking-wider uppercase font-medium">The 2050 Kerala Home</p>
              <p className="mt-5 max-w-sm text-sm lg:text-base leading-relaxed text-nanavu-offwhite/70">
                Imagining a Kerala home that is affordable, low-carbon, climate-resilient, and comfortable.
              </p>
            </div>
            <div className="col-span-7 col-start-6">
              <div className="experience-image relative h-[55vh] w-full overflow-hidden">
                <ImagePlaceholder label="Concept Pitching" category="TRACK 03" aspect="h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* 04 - EXHIBITION */}
        <div className="experience-panel relative w-[80vw] h-screen flex-shrink-0 px-12 lg:px-16 flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <div className="experience-image relative h-[55vh] w-full overflow-hidden">
                <ImagePlaceholder label="Exhibition" category="TRACK 04" aspect="h-full" />
              </div>
            </div>
            <div className="experience-content col-span-5 col-start-8">
              <span className="text-xs tracking-[0.3em] text-nanavu-sand font-medium">04 / TRACK FOUR</span>
              <h3 className="mt-4 text-[4vw] leading-[0.9] tracking-[-0.05em] font-light text-[#D8C7A5]">
                EXHIBITION
              </h3>
              <p className="mt-2 text-sm text-[#C99A72] tracking-wider uppercase font-medium">Sustainable Showcase</p>
              <p className="mt-5 max-w-sm text-sm lg:text-base leading-relaxed text-nanavu-offwhite/70">
                A showcase of innovative ideas, materials, technologies, and student projects focused on sustainable construction.
              </p>
            </div>
          </div>
          <div className="absolute right-8 bottom-8">
            <span className="text-xs tracking-[0.25em] text-nanavu-teal">CONTINUE →</span>
          </div>
        </div>

      </div>

      {/* MOBILE */}
      <div className="md:hidden px-6 py-24">
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.4em] text-nanavu-sand">04 / EXPERIENCE</span>
          <h2 className="mt-8 text-[19vw] leading-[0.75] tracking-[-0.07em] font-light">THE<br />EXPERIENCE</h2>
        </div>

        {[
          {
            number: "01",
            title: "TECHNICAL SESSIONS",
            color: "text-nanavu-teal",
            text: "Expert-led sessions on emerging materials, technologies, and practices in sustainable construction, with opportunities for interaction and knowledge exchange.",
          },
          {
            number: "02",
            title: "PANEL DISCUSSION",
            color: "text-nanavu-clay",
            text: "Bridging Education and Practice: Why Sustainability Remains Optional in Construction — exploring the gap between education and professional practice.",
          },
          {
            number: "03",
            title: "CONCEPT PITCHING",
            color: "text-nanavu-sand",
            text: "The 2050 Kerala Home — imagining a Kerala home that is affordable, low-carbon, climate-resilient, and comfortable.",
          },
          {
            number: "04",
            title: "EXHIBITION",
            color: "text-nanavu-offwhite",
            text: "A showcase of innovative ideas, materials, technologies, and student projects focused on sustainable construction.",
          },
        ].map((item) => (
          <div key={item.number} className="mb-24">
            <span className="text-xs tracking-[0.3em] text-nanavu-sand">{item.number}</span>
            <h3 className={`mt-5 text-[15vw] leading-[0.9] tracking-[-0.05em] font-light ${item.color}`}>
              {item.title}
            </h3>
            <div className="relative mt-8 w-full h-[48vh] overflow-hidden">
              <img src="/experience.jpg" alt={`NANAVU ${item.title}`} className="w-full h-full object-cover" />
              <div className="absolute left-5 bottom-5 px-3 py-2 bg-black/40 backdrop-blur-sm text-[9px] tracking-[0.3em]">
                {item.title}
              </div>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-nanavu-offwhite/60">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;