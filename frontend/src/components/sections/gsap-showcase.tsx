"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Settings, Code2, Database } from "lucide-react";

export function GsapShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const windmillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. The Pinning & Scrubbing Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top", // When the top of the container hits the top of the viewport
        end: "+=2000",    // Pin for 2000px of scrolling
        scrub: 1,         // Smooth scrubbing effect (1 second delay)
        pin: true,        // Pin the container in place
      }
    });

    // Animate the "windmill" / gear rotating
    tl.to(windmillRef.current, {
      rotate: 360 * 3, // Rotate 3 full times
      ease: "none",
    }, 0); // start at time 0

    // Animate the huge text scaling down and fading
    tl.to(textRef.current, {
      scale: 3,
      opacity: 0,
      ease: "power2.inOut"
    }, 0);

    // Cards sliding in from the bottom
    // We animate the parent container on mobile to avoid breaking the horizontal scroll layout
    tl.fromTo(cardsRef.current, 
      { y: "100vh", opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        ease: "power2.out"
      }, 0.1 
    );

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: container }); 

  return (
    <div className="w-full bg-[#f5f4ef]">
      <section ref={container} className="h-screen w-full bg-[#f5f4ef] overflow-hidden flex items-center justify-center relative text-[#0a0a0a]">
        
        {/* Background Graphic (The "Windmill" Gear) */}
        <div 
          ref={windmillRef} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none"
        >
          <Settings className="w-[800px] h-[800px] text-[#0a0a0a]" strokeWidth={0.5} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-0 md:px-12 flex items-center justify-center">
          
          {/* Massive Text */}
          <h2 ref={textRef} className="absolute text-5xl md:text-8xl font-black text-center tracking-tighter w-full leading-tight text-[#0a0a0a] px-4">
            Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">Excellence.</span>
          </h2>

          {/* The Cards that slide in on scroll */}
          <div ref={cardsRef} className="absolute flex flex-row gap-5 md:gap-8 justify-start md:justify-center w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar z-20 px-[10vw] md:px-0 py-10">
            <div className="w-[80vw] sm:w-[300px] md:w-[320px] shrink-0 snap-center">
              <div className="h-full bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl p-5 md:p-6 flex flex-col items-center gap-3 md:gap-4 shadow-xl hover:-translate-y-2 hover:shadow-[#8b5cf6]/20 transition-all duration-300">
                <img src="/card1.png" alt="A+ Grade" className="w-full h-[160px] md:h-[180px] object-cover rounded-2xl bg-black/5" />
                <h3 className="text-xl md:text-2xl font-bold mt-2 text-[#0a0a0a]">A+ Guaranteed</h3>
                <p className="text-center text-black/60 text-sm">Expertly crafted projects guaranteed to get you top marks and impress your professors.</p>
              </div>
            </div>

            <div className="w-[80vw] sm:w-[300px] md:w-[320px] shrink-0 snap-center md:translate-y-12">
              <div className="h-full bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl p-5 md:p-6 flex flex-col items-center gap-3 md:gap-4 shadow-xl hover:-translate-y-2 hover:shadow-[#ec4899]/20 transition-all duration-300">
                <img src="/card2.png" alt="Instant Setup" className="w-full h-[160px] md:h-[180px] object-cover rounded-2xl bg-black/5" />
                <h3 className="text-xl md:text-2xl font-bold mt-2 text-[#0a0a0a]">Instant Setup</h3>
                <p className="text-center text-black/60 text-sm">Download immediately after purchase with step-by-step guides for zero configuration hassle.</p>
              </div>
            </div>
            
            <div className="w-[80vw] sm:w-[300px] md:w-[320px] shrink-0 snap-center">
              <div className="h-full bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl p-5 md:p-6 flex flex-col items-center gap-3 md:gap-4 shadow-xl hover:-translate-y-2 hover:shadow-[#ea580c]/20 transition-all duration-300">
                <img src="/card3.png" alt="Original Code" className="w-full h-[160px] md:h-[180px] object-cover rounded-2xl bg-black/5" />
                <h3 className="text-xl md:text-2xl font-bold mt-2 text-[#0a0a0a]">100% Original</h3>
                <p className="text-center text-black/60 text-sm">Plagiarism-free source code built from scratch using modern industry standards.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
