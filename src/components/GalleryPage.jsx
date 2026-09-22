import { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  const images = [
    { src: "/gallery/nanavu1.jpeg", title: "Inauguration Ceremony", speed: 1.2, aspect: "aspect-[16/9]" },
    { src: "/gallery/nanavu2.jpeg", title: "Keynote Session", speed: 0.8, aspect: "aspect-[4/5]" },
    { src: "/gallery/nanavu3.jpeg", title: "Audience Interaction", speed: 1.5, aspect: "aspect-[3/2]" },
    { src: "/gallery/nanavu4.jpeg", title: "Workshop Highlights", speed: 0.9, aspect: "aspect-[16/9]" },
    { src: "/gallery/nanavu5.jpeg", title: "Panel Discussion", speed: 1.3, aspect: "aspect-[3/4]" },
    { src: "/gallery/nanavu6.jpeg", title: "Student Projects", speed: 0.7, aspect: "aspect-[16/9]" },
    { src: "/gallery/nanavu7.jpeg", title: "Networking Event", speed: 1.1, aspect: "aspect-[3/2]" },
    { src: "/gallery/nanavu8.jpeg", title: "Closing Ceremony", speed: 1.4, aspect: "aspect-[16/9]" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Subtle parallax effect on desktop sizes
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        // Hero text fades out on scroll
        gsap.to(".hero-text", {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "500px top",
            scrub: true
          }
        });

        // Parallax for each image individually based on their position in the viewport
        gsap.utils.toArray(".parallax-img").forEach((el) => {
          const speed = parseFloat(el.dataset.speed);
          
          gsap.fromTo(el, 
            { y: 50 * speed },
            {
              y: -50 * speed,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      } else {
        // Simple reveal for mobile
        gsap.utils.toArray(".parallax-img").forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          });
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#111514] text-[#F3EFE6] selection:bg-[#287A73] selection:text-white pb-32">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 z-50 mix-blend-difference flex justify-between items-center pointer-events-auto">
        <Link 
          to="/" 
          className="text-sm tracking-widest font-medium uppercase hover:text-[#287A73] transition-colors flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </Link>
        <span className="text-xs tracking-[0.3em] font-medium opacity-50 uppercase">Gallery</span>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-text relative w-full pt-40 pb-24 md:pt-56 md:pb-32 flex flex-col items-center justify-center text-center px-6 z-10">
        <p className="text-[#287A73] text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-medium">
          A Visual Journey
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-[7vw] font-light tracking-tight leading-[0.9] mb-8">
          The <span className="italic font-serif text-[#D8C7A5]">Nanavu</span> <br />
          Experience.
        </h1>
        <p className="text-sm md:text-lg max-w-xl text-[#8C877D] font-light leading-relaxed mx-auto">
          Explore a dynamic collection of our memories, spaces, and collaborations.
        </p>
      </div>

      {/* STAGGERED PARALLAX GRID */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-8 md:gap-12 md:mt-24 lg:mt-32">
            {[images[0], images[3], images[6]].map((img, idx) => (
              <GalleryItem key={`col1-${idx}`} img={img} onClick={() => setSelectedImage(img)} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8 md:gap-12">
            {[images[1], images[4], images[7]].map((img, idx) => (
              <GalleryItem key={`col2-${idx}`} img={img} onClick={() => setSelectedImage(img)} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 md:gap-12 md:mt-48 lg:mt-64 hidden lg:flex">
            {[images[2], images[5]].map((img, idx) => (
              <GalleryItem key={`col3-${idx}`} img={img} onClick={() => setSelectedImage(img)} />
            ))}
          </div>
          
          {/* For tablet (md) where col-3 is hidden, we distribute the remaining images */}
          <div className="flex flex-col gap-8 md:gap-12 md:mt-16 lg:hidden hidden md:flex">
             {[images[2], images[5]].map((img, idx) => (
              <GalleryItem key={`col-md-${idx}`} img={img} onClick={() => setSelectedImage(img)} />
            ))}
          </div>

        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md transition-all"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#287A73] transition-colors p-2 z-50 group pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <span className="text-sm tracking-widest uppercase font-medium group-hover:scale-105 inline-block transition-transform">
              Close ✕
            </span>
          </button>

          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            <p className="text-white mt-8 text-sm md:text-lg tracking-[0.2em] uppercase font-light border-b border-white/20 pb-2">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryItem({ img, onClick }) {
  return (
    <div 
      data-speed={img.speed}
      className={`parallax-img group relative w-full cursor-pointer overflow-hidden bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${img.aspect || 'aspect-video'}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[#287A73]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      <img 
        src={img.src} 
        alt={img.title} 
        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
        loading="lazy"
      />
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none translate-y-4 group-hover:translate-y-0">
        <span className="text-sm md:text-base font-medium tracking-widest uppercase text-white drop-shadow-md">
          {img.title}
        </span>
      </div>
    </div>
  );
}

export default GalleryPage;
