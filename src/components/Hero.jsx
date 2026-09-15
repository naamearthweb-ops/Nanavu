import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);

  // ==========================================
  // HERO REFS
  // ==========================================

  const logoRef = useRef(null);
  const logoBreathingRef = useRef(null);
  const countdownRef = useRef(null);

  // ==========================================
  // VIDEO REFS
  // ==========================================

  const videoRef = useRef(null);
  const videoCurtainRef = useRef(null);

  // ==========================================
  // STATES
  // ==========================================

  const [videoVisible, setVideoVisible] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // ==========================================
  // CONTROL REFS
  // ==========================================

  // Prevent intro from finishing multiple times
  const introFinishedRef = useRef(false);

  // Prevent first-scroll animation from
  // running more than once
  const heroAnimationStartedRef = useRef(false);

  // ==========================================
  // COUNTDOWN
  // ==========================================

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(
      "2026-10-02T09:00:00+05:30"
    );

    const updateCountdown = () => {
      const now = new Date();

      const difference =
        targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(
          difference /
            (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference /
            (1000 * 60 * 60)) %
            24
        ),

        minutes: Math.floor(
          (difference /
            (1000 * 60)) %
            60
        ),

        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // FORMAT NUMBER
  // ==========================================

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  // ==========================================
  // FINISH INTRO
  // ==========================================

  const finishIntro = (skip = false) => {
    // Prevent duplicate triggers
    if (introFinishedRef.current) return;

    introFinishedRef.current = true;

    // Always keep viewport at top
    window.scrollTo(0, 0);

    // Temporarily prevent page movement
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    const curtain = videoCurtainRef.current;

    if (video) {
      video.pause();
    }

    // ========================================
    // FAST SKIP
    // ========================================
    if (skip) {
      if (video) {
        gsap.killTweensOf(video);

        gsap.to(video, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            setVideoVisible(false);
            setIntroComplete(true);
          },
        });
      } else {
        setVideoVisible(false);
        setIntroComplete(true);
      }

      return;
    }

    // ========================================
    // NORMAL VIDEO END
    // ========================================

    if (!curtain) {
      setVideoVisible(false);
      setIntroComplete(true);
      return;
    }

    gsap.killTweensOf(curtain);

    gsap.set(curtain, {
      opacity: 0,
    });

    gsap.to(curtain, {
      opacity: 1,
      duration: 0.9,
      ease: "power1.inOut",

      onComplete: () => {
        setVideoVisible(false);
        setIntroComplete(true);
      },
    });
  };

  // ==========================================
  // VIDEO ENDED
  // ==========================================

  const handleVideoEnded = () => {
    finishIntro(false);
  };

  // ==========================================
  // CLICK DURING INTRO
  // ==========================================

  useEffect(() => {
    if (!videoVisible) return;

    const handleClick = () => {
      finishIntro(true);
    };

    window.addEventListener(
      "click",
      handleClick
    );

    return () => {
      window.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [videoVisible]);

  // ==========================================
  // SCROLL DURING INTRO
  // ==========================================

  useEffect(() => {
    if (!videoVisible) return;

    const handleWheel = (event) => {
      // Prevent the page from actually scrolling
      event.preventDefault();

      // Any scroll skips the video
      finishIntro(true);
    };

    const handleTouch = (event) => {
      // Prevent mobile page movement
      event.preventDefault();

      finishIntro(true);
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    window.addEventListener(
      "touchmove",
      handleTouch,
      {
        passive: false,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchmove",
        handleTouch
      );
    };
  }, [videoVisible]);

  // ==========================================
  // HERO FIRST-SCROLL ANIMATION
  // ==========================================

  useEffect(() => {
    if (!introComplete) return;

    const logo = logoRef.current;
    const countdown = countdownRef.current;

    if (!logo || !countdown) {
      document.body.style.overflow = "";
      return;
    }

    // ------------------------------------------
    // INITIAL HERO STATE
    // ------------------------------------------

    gsap.set(logo, {
      y: 0,
    });

    gsap.set(countdown, {
      y: 40,
      opacity: 0,
    });

    // Unlock normal interaction
    document.body.style.overflow = "";

    // ------------------------------------------
    // FIRST SCROLL
    // ------------------------------------------

    const handleFirstScroll = () => {
      // Already animated
      if (heroAnimationStartedRef.current) {
        return;
      }

      heroAnimationStartedRef.current = true;

      // Temporarily lock page while transition plays
      document.body.style.overflow = "hidden";

      const timeline = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      // ----------------------------------------
      // LOGO MOVES UP
      // ----------------------------------------

      const logoY = window.innerWidth < 640 ? -60 : (window.innerWidth < 1024 ? -80 : -100);

      timeline.to(logo, {
        y: logoY,
        duration: 0.9,
        ease: "power3.inOut",
      });

      // ----------------------------------------
      // COUNTDOWN ENTERS
      // ----------------------------------------

      timeline.to(
        countdown,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

    };

    window.addEventListener(
      "wheel",
      handleFirstScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchmove",
      handleFirstScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleFirstScroll
      );

      window.removeEventListener(
        "touchmove",
        handleFirstScroll
      );
    };
  }, [introComplete]);

  // ==========================================
  // LOGO BREATHING EFFECT
  // ==========================================

  useEffect(() => {
    if (!introComplete) return;

    const breathingLogo =
      logoBreathingRef.current;

    if (!breathingLogo) return;

    /*
      Very subtle breathing.

      The actual logo wrapper handles
      vertical movement.

      This inner wrapper handles only
      the breathing scale.

      So the two animations don't fight.
    */

    const breathing = gsap.to(
      breathingLogo,
      {
        scale: 1.018,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }
    );

    return () => {
      breathing.kill();
    };
  }, [introComplete]);

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";

      gsap.killTweensOf(
        logoRef.current
      );

      gsap.killTweensOf(
        logoBreathingRef.current
      );

      gsap.killTweensOf(
        countdownRef.current
      );

      gsap.killTweensOf(
        videoRef.current
      );

      gsap.killTweensOf(
        videoCurtainRef.current
      );
    };
  }, []);

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F3EFE6]
      "
    >

      {/* ==================================================
          HERO CONTENT
      ================================================== */}

      <div
        className="
          relative
          min-h-screen
          w-full
          px-6
        "
      >

        {/* ==================================================
            LOGO
        ================================================== */}

        <div
          ref={logoRef}
          className="
            absolute
            left-6
            md:left-1/2
            top-1/2
            md:-translate-x-1/2
            -translate-y-1/2

            w-full

            flex
            items-center
            justify-start
            md:justify-center

            pointer-events-none
          "
        >

          {/* ----------------------------------------------
              BREATHING WRAPPER

              This handles ONLY scale.

              logoRef handles ONLY vertical movement.
          ---------------------------------------------- */}

          <div
            ref={logoBreathingRef}
            className="
              flex
              items-center
              justify-center
              will-change-transform
            "
          >

            <img
              src="/nanavu-logo.png"
              alt="NANAVU"
              className="
                w-[65vw]
                max-w-[600px]
                h-auto
                block
              "
            />

          </div>

        </div>


        {/* ==================================================
            COUNTDOWN
        ================================================== */}

        <div
          ref={countdownRef}
          className="
            absolute
            left-6
            md:left-1/2
            top-[52%]
            sm:top-[56%]
            md:top-[60%]
            
            md:-translate-x-1/2

            w-full
            max-w-lg
            pr-4
            md:px-4

            text-left
            md:text-center
            opacity-0
          "
        >

          {/* FESTIVAL */}

          <p
            className="
              text-[9px]
              sm:text-[10px]
              tracking-[0.4em]
              text-[#8C877D]
            "
          >
            NANAVU '26
          </p>


          {/* DATE / TAGLINE */}

          <p
            className="
              mt-1.5
              sm:mt-3
              text-xs
              sm:text-sm
              tracking-[0.2em]
              sm:tracking-[0.25em]
              text-[#29312F]
            "
          >
            NATIONAL SUSTAINABILITY CONCLAVE
          </p>

          <p
            className="
              mt-2
              text-[9px]
              sm:text-[10px]
              tracking-[0.25em]
              text-[#8C877D]
            "
          >
            OCTOBER 2, 2026 · 9:00 AM — 5:00 PM
          </p>


          {/* COUNTDOWN */}

          <div
            className="
              mt-4
              sm:mt-6

              flex
              items-start
              justify-start
              md:justify-center

              gap-3
              sm:gap-6
              md:gap-10
            "
          >

            {/* DAYS */}

            <div className="text-center">

              <div
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-light
                  leading-none

                  text-[#29312F]
                "
              >
                {formatNumber(
                  timeLeft.days
                )}
              </div>

              <div
                className="
                  mt-2
                  sm:mt-3

                  text-[7px]
                  sm:text-[9px]

                  tracking-[0.25em]
                  sm:tracking-[0.3em]

                  text-[#8C877D]
                "
              >
                DAYS
              </div>

            </div>


            {/* COLON */}

            <div
              className="
                text-xl
                sm:text-3xl
                md:text-4xl

                font-light

                text-[#C99A72]
              "
            >
              :
            </div>


            {/* HOURS */}

            <div className="text-center">

              <div
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-light
                  leading-none

                  text-[#29312F]
                "
              >
                {formatNumber(
                  timeLeft.hours
                )}
              </div>

              <div
                className="
                  mt-2
                  sm:mt-3

                  text-[7px]
                  sm:text-[9px]

                  tracking-[0.25em]
                  sm:tracking-[0.3em]

                  text-[#8C877D]
                "
              >
                HOURS
              </div>

            </div>


            {/* COLON */}

            <div
              className="
                text-xl
                sm:text-3xl
                md:text-4xl

                font-light

                text-[#C99A72]
              "
            >
              :
            </div>


            {/* MINUTES */}

            <div className="text-center">

              <div
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-light
                  leading-none

                  text-[#29312F]
                "
              >
                {formatNumber(
                  timeLeft.minutes
                )}
              </div>

              <div
                className="
                  mt-2
                  sm:mt-3

                  text-[7px]
                  sm:text-[9px]

                  tracking-[0.25em]
                  sm:tracking-[0.3em]

                  text-[#8C877D]
                "
              >
                MINUTES
              </div>

            </div>


            {/* COLON */}

            <div
              className="
                text-xl
                sm:text-3xl
                md:text-4xl

                font-light

                text-[#C99A72]
              "
            >
              :
            </div>


            {/* SECONDS */}

            <div className="text-center">

              <div
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-light
                  leading-none

                  text-[#29312F]
                "
              >
                {formatNumber(
                  timeLeft.seconds
                )}
              </div>

              <div
                className="
                  mt-2
                  sm:mt-3

                  text-[7px]
                  sm:text-[9px]

                  tracking-[0.25em]
                  sm:tracking-[0.3em]

                  text-[#8C877D]
                "
              >
                SECONDS
              </div>

            </div>

          </div>

          {/* JOIN NANAVU CTA BUTTON */}
          <div className="mt-5 sm:mt-7 flex justify-start md:justify-center pointer-events-auto">
            <a
              href="#join"
              className="
                group
                inline-flex
                items-center
                gap-2.5
                sm:gap-3
                px-5
                sm:px-6
                py-2
                sm:py-2.5
                border
                border-[#29312F]/40
                rounded-full
                text-[9px]
                sm:text-xs
                tracking-[0.2em]
                sm:tracking-[0.25em]
                text-[#29312F]
                font-medium
                uppercase
                transition-all
                duration-500
                hover:bg-[#287A73]
                hover:border-[#287A73]
                hover:text-[#F3EFE6]
                hover:shadow-md
                active:scale-95
              "
            >
              <span>JOIN NANAVU</span>
              <span className="text-xs sm:text-sm transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>

      </div>


      {/* ==================================================
          VIDEO INTRO
      ================================================== */}

      {videoVisible && (
        <div
          className="
            fixed
            inset-0

            z-[100]

            overflow-hidden

            bg-[#F3EFE6]
          "
        >

          {/* VIDEO */}

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline

            playbackRate={1.5}

            onEnded={handleVideoEnded}

            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2

              w-full
              h-[75vh]
              md:h-full

              object-cover
            "
          >

            <source
              src="/nanavu-intro.mp4"
              type="video/mp4"
            />

            Your browser does not support
            the video tag.

          </video>


          {/* =================================================
              PAPER CURTAIN
          ================================================= */}

          <div
            ref={videoCurtainRef}
            className="
              absolute
              inset-0

              bg-[#F3EFE6]

              opacity-0

              pointer-events-none
            "
          ></div>

        </div>
      )}

    </section>
  );
}

export default Hero;
