import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Highlights() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".highlight-img",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".highlights-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-8 md:px-16 bg-[#F3EFE6] overflow-hidden">
      <div className="highlights-container max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="w-8 h-[1px] bg-nanavu-teal" />
          <span className="text-[10px] tracking-[0.35em] text-nanavu-stone uppercase">Event Glimpses</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Main Large Image */}
          <div className="highlight-img overflow-hidden rounded-3xl aspect-video md:aspect-[21/9] relative group shadow-sm md:col-span-2">
            <img 
              src="/gallery/nanavu1.jpeg" 
              alt="Nanavu Highlight 1" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
          
          {/* Two Smaller Images Below */}
          <div className="highlight-img overflow-hidden rounded-3xl aspect-[3/2] relative group shadow-sm">
            <img 
              src="/gallery/nanavu2.jpeg" 
              alt="Nanavu Highlight 2" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
          <div className="highlight-img overflow-hidden rounded-3xl aspect-[3/2] relative group shadow-sm">
            <img 
              src="/gallery/nanavu3.jpeg" 
              alt="Nanavu Highlight 3" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
