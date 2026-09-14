import React from "react";

/**
 * ImagePlaceholder component for NANAVU website.
 * Renders an elegant SVG/CSS placeholder when an image is missing or intentionally set to placeholder mode.
 */
function ImagePlaceholder({ label, aspect = "aspect-[4/3]", className = "", category = "MEDIA PLACEHOLDER" }) {
  return (
    <div
      className={`relative w-full h-full min-h-[160px] bg-[#1E2523] border border-[#287A73]/30 rounded-lg overflow-hidden flex flex-col justify-between p-4 group select-none transition-all duration-500 hover:border-[#D8C7A5]/50 ${aspect} ${className}`}
    >
      {/* Background SVG Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F3EFE6" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#287A73] font-medium">
          {category}
        </span>
        <div className="w-2 h-2 rounded-full bg-[#C99A72] opacity-70 animate-pulse" />
      </div>

      {/* Center Label */}
      <div className="relative z-10 my-auto text-center px-2">
        <div className="inline-block p-3 rounded-full bg-[#287A73]/10 border border-[#287A73]/20 mb-3 text-[#D8C7A5]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-xs md:text-sm font-light text-[#F3EFE6] tracking-wide leading-tight">
          {label}
        </p>
        <p className="text-[9px] tracking-[0.18em] text-[#8C877D] mt-1.5">
          [ REPLACE WITH IMAGE ]
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between text-[8px] tracking-[0.2em] text-[#8C877D]">
        <span>NANAVU 2026</span>
        <span>SUSTAINABLE CONCLAVE</span>
      </div>
    </div>
  );
}

export default ImagePlaceholder;
