import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Speakers() {
  const sectionRef = useRef(null);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const speakers = [
    {
      number: "01",
      name: "AR. P.B. SAJAN",
      role: "CHIEF ARCHITECT & JOINT DIRECTOR, COSTFORD",
      location: "SPEAKER",
      topic: "Bamboo for Contemporary Architecture: From Concept to Construction",
      image: "https://vescoa.ves.ac.in/wp-content/uploads/2023/07/12.-Ar.-P.-B.-Sajan.jpg",
      description: "HUDCO Award winner and disciple of Laurie Baker. Champion of cost-effective green housing, rat-trap bond masonry, bamboo structures, and filler slabs.",
      detailedDescription: [
        "Ar. P.B. Sajan is a prominent architect who serves as the Joint Director and Chief Architect at COSTFORD (Centre of Science and Technology for Rural Development).",
        "A dedicated disciple of the master architect Laurie Baker, Sajan worked closely with him for nearly 25 years. He plays a crucial role in promoting and implementing Baker's architectural theories, specializing in sustainable, green, and cost-effective building technologies.",
        "His work seamlessly integrates human systems with natural systems, extensively utilizing materials like mud, bamboo, and recycled items. Recognized nationally with awards from HUDCO for his innovative green building models, he continues to educate and inspire the next generation through the Laurie Baker Centre for Habitat Studies."
      ]
    },
    {
      number: "02",
      name: "AR. VINU DANIEL",
      role: "FOUNDER, WALLMAKERS · TIME100 NEXT 2023",
      location: "SPEAKER",
      topic: "Can We Build Differently? A Conversation with the Next Generation",
      image: "https://www.asiarealestatesummit.com/wp-content/uploads/2023/10/Ar.-Vinu-Daniel_Temp-e1696505956368.png",
      description: "Royal Academy Dorfman Award winner known for eco-responsive structures, Compressed Stabilised Earth Blocks (CSEB), scrap material upcycling, and mud masonry.",
      detailedDescription: [
        "Vinu Daniel is an acclaimed Indian architect and the founder of Wallmakers, an architectural firm recognized globally for its pioneering work in sustainable, eco-friendly, and cost-effective architecture.",
        "Born in Dubai and educated at the College of Engineering, Trivandrum, his journey into sustainable architecture was deeply influenced by his early work with the Auroville Earth Institute on post-tsunami construction projects. Under the inspiration of Laurie Baker, Daniel focuses on creating spaces that respond to specific site contexts.",
        "He is celebrated for his commitment to utilizing unconventional and recycled materials, including mud, debris, discarded tires, and plastic bottles, drastically minimizing the carbon footprint of his buildings. In 2022, he was awarded the prestigious Royal Academy Dorfman Award, and in 2023, he was named one of the influential figures in the TIME100 Next list."
      ]
    },
    {
      number: "03",
      name: "DR. V. SUBHASH CHANDRA BOSE",
      role: "FORMER DIRECTOR, WATER RESOURCES DEPT",
      location: "SPEAKER",
      topic: "The Last Bus for Green Initiatives: Sustainability – Still Out of Syllabus?",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7p4y8zR2toQN8U7QEJ7SQiECtn4yS16D8m1XreyW2Pa3CcusdbXeNL3VS&s=10",
      imageStyle: { objectPosition: "40% 0%" },
      wrapperStyle: { transform: "scale(1.2)" },
      description: "Former Director of the Water Resources Department, author of 16 books, and leading consultant for various green global agencies.",
      detailedDescription: [
        "Dr. V. Subhash Chandra Bose is the Former Director of the Water Resources Department sponsored by the Ministry of Jalashakti, GOI.",
        "He holds multiple prestigious degrees including MSc, BEd, LLB, MBA, MSW, PGJMC, and a PhD. He has worked with notable organizations such as NCESS, KSREC, KSLUB, Western Ghat Cell, and the Rain Centre.",
        "An active voice in environmental consultancy, he is the CEO and Chief Editor of two digital channels, Subhashitham and Green Global, providing consultancy for various agencies.",
        "Over his career, he has published 16 books and 2,000 articles, and has delivered 20,000 speeches across Kerala, India, and abroad, frequently appearing as a guest on several channels."
      ]
    },
    {
      number: "04",
      name: "AR. MANASI PULIYAPPATTA",
      role: "CO-FOUNDER, BHOOMIJA",
      location: "SPEAKER",
      topic: "Sustainability as a Way of Thinking: The Bhoomija Story",
      image: "https://www.bhoomija.com/images/manasi_guru1.jpg",
      imageStyle: { objectPosition: "85% 30%" },
      wrapperStyle: { transform: "scale(1.25)" },
      description: "Co-founder of Bhoomija, dedicated to creating nature inclusive, people friendly, and context sensible architecture.",
      detailedDescription: [
        "Team Bhoomija was born in the year of 2011, out of the love and passion for architecture shared by the couple Ar. Guruprasad Rane & Ar. Manasi Puliyappatta.",
        "Being a Maharashtrian born and brought up in Mumbai, Guruprasad Rane came to Kerala in 2003 after Graduating from L.S.Raheja School of Architecture and chose to practice under Ar. G.Shankar (Habitat Technology Group, Trivandum), to explore alternate and sustainable building practices.",
        "Meanwhile, Manasi also joined the same workplace after her B.Arch from M.E.S. Kuttipuram, driven by the same interest. Somewhere their dreams met and they decided to walk together in life as well as their profession.",
        "Bhoomija sprouted from this common ground as an extension of their dream of creating nature inclusive, people friendly, context sensible architecture."
      ]
    },
    {
      number: "05",
      name: "AR. KUKKU JOSEPH JOSE",
      role: "FOUNDER: NOW & BUILD NOW",
      location: "SPEAKER",
      topic: "Sustainability: Isn't My Responsibility?",
      image: "kukku.jpeg",
      description: "Specialized in design thinking methodology, climate responsive designs, and sustainable energy.",
      detailedDescription: [
        "Ar. Kukku Joseph Jose is an interArchitect Kukku Joseph is specialized in design thinking methodology to design products, services and environments.national architect and educator based in Kochi, Kerala. As the founder of NOW & BUILD NOW, he applies design thinking across architecture, products, and environments, with a strong focus on climate responsiveness, sustainable energy, user comfort, and long-term efficiency.",
        "Guided by a philosophy of \"Infuse in Action,\" Ar. Kukku views sustainability as an extension of wholeness—where built structures exist in harmony with human activity and natural ecosystems. His creative approach is rooted in an endless cycle of Learning, Unlearning, and Relearning, breaking away from conventional design conditioning to build for the future.",
        "A strong advocate for innovation and technological integration, Ar. Kukku actively shapes the next generation of architects through research-driven mentorship, publishing, and academic contributions. Across master planning, architectural design, and complex construction execution, his work transforms intricate client briefs into forward-thinking, high-performance environments.",
        "\"OWN your NOW.\"",
      ]
    },
    {
      number: "06",
      name: "Er. K. MADHAVAN NAMBOODIRI",
      role: "GREEN BUILDER · WATER MANAGEMENT SPECIALIST",
      location: "SPEAKER",
      topic: "An Iterative Action Research Initiative in Pursuit of Sustainable Habitat Systems in Kerala",
      image: "madhavan.png",
      description: "Retired civil engineer, water management specialist, and green builder advancing sustainable, low-cost earth architecture in Kerala.",
      detailedDescription: [
        "K. Madhavan Namboodiri is a retired civil engineer, water management specialist, and green builder from Kuttippuram, Kerala, widely recognized for his contributions to sustainable earth architecture.",
        "Through the Susthira Bhavanam Foundation, a non-profit organization he founded in 2019, he champions eco-friendly and low-cost building techniques.",
        "His work offers a practical alternative to resource-heavy concrete construction, promoting homes that are sustainable, affordable, and grounded in earth-based building methods."
      ]
    },
    // {
    //   number: "02",
    //   name: "AR. EUGENE PANDALA",
    //   role: "FOUNDER, CSBNE · LAURIE BAKER AWARDEE",
    //   location: "SPEAKER",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Eugene_Pandala.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail_unscaled",
    //   description: "Pioneer of mud architecture, cob building, and eco-tourism design in India. Designer of Banasura Hill Resort—Asia's largest earth resort.",
    //   detailedDescription: [
    //     "Eugene Pandala is a prominent Indian architect, urban designer, and heritage conservator recognized for his pioneering work in environmental sustainability and mud architecture. He holds a Master's in Urban Design from the School of Planning and Architecture, New Delhi.",
    //     "Inspired by legendary architect Hassan Fathy, Pandala advocates for a 'glorious return to tradition' by utilizing natural, locally available materials such as mud, laterite, timber, and stone. His buildings are often described as extensions of the earth, featuring organic forms that harmonize with nature.",
    //     "His notable projects include Bodhi, his first major mud-house project, and The Raviz in Kollam, a deluxe resort blending traditional Travancore architecture with natural materials. Pandala was awarded the first Laurie Baker Award by the Lalit Kala Akademi in 2011 for his unwavering commitment to sustainable building."
    //   ]
    // },
    // {
    //   number: "03",
    //   name: "DR. BENNY KURIAKOSE",
    //   role: "MASTER ARCHITECT & HERITAGE CONSERVATOR",
    //   location: "SPEAKER",
    //   image: "https://www.architectandinteriorsindia.com/cloud/2021/11/15/benny.jpg",
    //   description: "Baker disciple, Charles Wallace Scholar, and creator of DakshinaChitra & Muziris Heritage Project. Leading authority on disaster rehabilitation & vernacular architecture.",
    //   detailedDescription: [
    //     "Dr. Benny Kuriakose is a distinguished Indian architect and consultant renowned for his expertise in architectural conservation and vernacular architecture. His career began in 1984 under the tutelage of the legendary Laurie Baker.",
    //     "A Charles Wallace Scholar, he holds a master’s degree in Conservation Studies from the University of York and a doctorate from IIT Madras. His work emphasizes climate-responsive design, environmental sustainability, and cost-effectiveness, deeply rooted in the traditional architectural practices of South India.",
    //     "Dr. Kuriakose has served as a consultant for UNESCO, UNDP, and various state governments. He is the mastermind behind landmark projects like DakshinaChitra, the Muziris Heritage Project, and several disaster-relief rehabilitation settlements. He was honored with the Inside Outside Designer of the Year award in 2001."
    //   ]
    
    {
      number: "07",
      name: "DR. SAJEEB R",
      role: "FORMER PRINCIPAL, TKMCE",
      // location: "SPEAKER",
      image: "sajeeb.jpeg",
      description: "Distinguished academician and structural engineer with expertise in structural dynamics and sustainable construction.",
      detailedDescription: [
        "Dr. R. Sajeeb is a distinguished academician, structural engineer, and former Principal of TKM College of Engineering, with over three decades of experience in teaching, research, academic leadership, and professional practice.",
        "An alumnus of TKM College of Engineering and a Kerala University B.Tech. rank holder from the 1991 batch, he pursued his Master’s in Structural Engineering and Ph.D. in Structural Dynamics at the Indian Institute of Science (IISc), Bengaluru.",
        "His academic and research expertise encompasses structural dynamics, earthquake-resistant design, structural control, sustainable construction, and advanced structural engineering practices. His work reflects a strong interdisciplinary approach to addressing contemporary challenges in the built environment, with an emphasis on resilience, sustainability, and performance-based engineering.",
        "As an experienced academic leader and mentor, Dr. Sajeeb has contributed significantly to engineering education, research, and the development of young professionals. His extensive experience at the intersection of structural engineering, sustainability, research, and education brings valuable perspective to discussions on the future of sustainable and resilient construction."
      ]
    },
    {
      number: "08",
      name: "AR. HARITHA C",
      role: "ASSISTANT PROFESSOR, DEPARTMENT OF ARCHITECTURE",
      // location: "SPEAKER",
      image: "https://dap.tkmce.ac.in/wp-content/uploads/2025/02/HARITHA-C.webp",
      description: "Assistant Professor at TKMCE specializing in Net-zero and low-carbon buildings. Recognized nationally with multiple awards including the JK AYA State Young Architect's Award.",
      detailedDescription: [
        "Haritha C is an Assistant Professor in the Department of Architecture and Planning at TKM College of Engineering, Kollam. She completed her B.Arch from NIT Calicut with a Gold medal in 2008 and holds a Master's in Sustainable Architecture from CEPT University, Ahmedabad. Before teaching, she worked with Larsen & Toubro in Chennai and Design seeds in Calicut.",
        "Her design work has been recognised nationally, with the 26th JK AYA State Young Architect's Award (2017), a Special Jury commendation at the NDTV Design & Architecture Awards, and a silver leaf at the IIA Kerala State Awards. She also received the Kerala Government's Swami Vivekanandan Yuva Prathibha Puraskaram in 2017 and was featured among twenty women architects by Vanitha Veedu in 2022.",
        "Her ongoing doctoral research at IIT Madras focuses on Net-zero and low-carbon buildings in India. She presented a part of this work at the World Sustainable Built Environment Conference (WSBE26) in Melbourne in June 2026."
      ]
    },
  ];

  // ==========================================
  // GSAP REVEAL
  // ==========================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header label
      gsap.from(".speakers-label", {
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

      // Main heading
      gsap.from(".speakers-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Description
      gsap.from(".speakers-description", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Speaker tiles
      const tiles = gsap.utils.toArray(".speaker-item");

      tiles.forEach((tile, index) => {
        gsap.from(tile, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: tile,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="
        relative
        overflow-hidden
        bg-nanavu-offwhite
        text-nanavu-charcoal
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
          md:pt-36
          pb-20
          md:pb-28
        "
      >
        {/* TOP */}

        <div
          className="
            speakers-label
            flex
            items-center
            justify-between
            mb-10
          "
        >
          <span
            className="
              text-[10px]
              tracking-[0.4em]
              text-nanavu-teal
            "
          >
            03 / RESOURCE PERSONS
          </span>

          <span
            className="
              text-[9px]
              tracking-[0.3em]
              text-nanavu-stone
            "
          >
            NANAVU '27
          </span>
        </div>

        {/* TITLE */}

        <h2
          className="
            speakers-title
            text-[14vw]
            md:text-[12vw]
            lg:text-[10vw]
            leading-[0.75]
            tracking-[-0.075em]
            font-light
          "
        >
          RESOURCE PERSONS
        </h2>

        {/* DESCRIPTION */}

        <div
          className="
            speakers-description
            mt-10
            md:mt-12
            flex
            justify-end
          "
        >
          <p
            className="
              max-w-sm
              text-sm
              md:text-base
              leading-relaxed
              text-nanavu-deepstone
            "
          >
            Voices from different disciplines,
            perspectives and places come together
            to question, imagine and create new
            possibilities.
          </p>
        </div>
      </div>

      {/* =================================================
          SPEAKER GRID
      ================================================= */}

      <div
        className="
          px-6
          md:px-12
          lg:px-20
          pb-32
          md:pb-40
        "
      >
        {/* ===============================================
            DESKTOP — 4 COMPACT TILES
        =============================================== */}

        <div
          className="
            hidden
            md:grid
            grid-cols-1
            md:grid-cols-3
            gap-8
            items-start
          "
        >
          {speakers.map((speaker, index) => (
            <div
              key={speaker.number}
              onClick={() => setActiveSpeaker(speaker)}
              className={`
                speaker-item
                group
                cursor-pointer
                ${index % 3 === 1 ? "mt-12" : index % 3 === 2 ? "mt-24" : ""}
              `}
            >
              {/* IMAGE */}

              <div
                className="
                  speaker-image-wrapper
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-nanavu-sand
                "
              >
                <div className="w-full h-full" style={speaker.wrapperStyle || {}}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={speaker.imageStyle || {}}
                    className="
                      speaker-image
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-[900ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* HOVER OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-nanavu-teal/0
                    group-hover:bg-nanavu-teal/20
                    transition-colors
                    duration-700
                  "
                />

                {/* NUMBER */}

                <span
                  className="
                    absolute
                    top-4
                    left-4
                    text-[9px]
                    tracking-[0.3em]
                    text-nanavu-offwhite
                    mix-blend-difference
                  "
                >
                  {speaker.number}
                </span>

                {/* VIEW */}

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    items-center
                    gap-2
                    opacity-0
                    translate-y-3
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all
                    duration-500
                  "
                >
                  <span
                    className="
                      text-[8px]
                      tracking-[0.25em]
                      text-nanavu-offwhite
                      mix-blend-difference
                    "
                  >
                    VIEW
                  </span>

                  <span
                    className="
                      text-sm
                      text-nanavu-offwhite
                      mix-blend-difference
                    "
                  >
                    →
                  </span>
                </div>
              </div>

              {/* INFO */}

              <div
                className="
                  mt-4
                  border-t
                  border-nanavu-charcoal/20
                  pt-3
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg
                        lg:text-xl
                        font-light
                        tracking-[-0.03em]
                      "
                    >
                      {speaker.name}
                    </h3>

                    <p
                      className="
                        mt-1.5
                        text-[9px]
                        tracking-[0.18em]
                        text-nanavu-teal
                        font-medium
                      "
                    >
                      {speaker.role}
                    </p>

                    {speaker.topic && (
                      <p className="mt-2 text-[10px] italic font-medium text-nanavu-charcoal/80 leading-snug">
                        <span className="not-italic font-semibold text-nanavu-teal mr-1">Topic:</span>
                        "{speaker.topic}"
                      </p>
                    )}

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-relaxed
                        text-nanavu-deepstone
                      "
                    >
                      {speaker.description}
                    </p>
                  </div>

                  <span
                    className="
                      text-[9px]
                      tracking-[0.18em]
                      text-nanavu-clay
                      font-medium
                      whitespace-nowrap
                      border border-nanavu-clay/30
                      px-2 py-0.5
                      rounded
                    "
                  >
                    {speaker.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===============================================
            MOBILE
        =============================================== */}

        <div
          className="
            md:hidden
            grid
            grid-cols-1
            gap-x-4
            gap-y-14
          "
        >
          {speakers.map((speaker) => (
            <div
              key={speaker.number}
              onClick={() => setActiveSpeaker(speaker)}
              className="
                speaker-item
                group
                cursor-pointer
              "
            >
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-nanavu-sand
                "
              >
                <div className="w-full h-full" style={speaker.wrapperStyle || {}}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={speaker.imageStyle || {}}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-[800ms]
                      ease-out
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-nanavu-teal/0
                    group-hover:bg-nanavu-teal/15
                    transition-colors
                    duration-500
                  "
                />

                {/* NUMBER */}

                <span
                  className="
                    absolute
                    top-3
                    left-3
                    text-[8px]
                    tracking-[0.25em]
                    text-nanavu-offwhite
                    mix-blend-difference
                  "
                >
                  {speaker.number}
                </span>
              </div>

              {/* INFO */}

              <div
                className="
                  mt-3
                  border-t
                  border-nanavu-charcoal/20
                  pt-3
                "
              >
                <h3
                  className="
                    text-sm
                    font-light
                    tracking-[-0.02em]
                  "
                >
                  {speaker.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-[7px]
                    tracking-[0.15em]
                    text-nanavu-stone
                  "
                >
                  {speaker.role}
                </p>

                {speaker.topic && (
                  <p className="mt-2 text-[9px] italic font-medium text-nanavu-charcoal/80 leading-snug">
                    <span className="not-italic font-semibold text-nanavu-teal mr-1">Topic:</span>
                    "{speaker.topic}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          BOTTOM TRANSITION
      ================================================= */}

      <div
        className="
          px-6
          md:px-12
          lg:px-20
          pb-10
        "
      >
        <div
          className="
            border-t
            border-nanavu-charcoal/20
            pt-4
            flex
            justify-between
            items-center
          "
        >
          <span
            className="
              text-[8px]
              tracking-[0.3em]
              text-nanavu-stone
            "
          >
            KEYNOTE & PANEL SPEAKERS
          </span>

          <span
            className="
              text-[8px]
              tracking-[0.3em]
              text-nanavu-teal
            "
          >
          </span>
        </div>
      </div>

      {/* =================================================
          SPEAKER DETAIL MODAL OVERLAY
      ================================================= */}

      {activeSpeaker && (
        <div
          onClick={() => setActiveSpeaker(null)}
          className="
            fixed
            inset-0
            z-[100]
            bg-black/80
            backdrop-blur-xl
            flex
            items-center
            justify-center
            p-4
            md:p-8
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
              bg-[#F3EFE6]
              text-[#29312F]
              rounded-3xl
              shadow-2xl
              p-6
              md:p-12
              border
              border-white/20
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveSpeaker(null)}
              className="
                absolute
                top-6
                right-6
                w-10
                h-10
                rounded-full
                bg-[#29312F]/10
                hover:bg-[#29312F]
                hover:text-[#F3EFE6]
                flex
                items-center
                justify-center
                text-lg
                transition-all
                duration-300
                z-20
              "
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* IMAGE COLUMN */}
              <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-nanavu-sand">
                <div className="w-full h-full" style={activeSpeaker.wrapperStyle || {}}>
                  <img
                    src={activeSpeaker.image}
                    alt={activeSpeaker.name}
                    style={activeSpeaker.imageStyle || {}}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.3em] text-[#F3EFE6] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded">
                  SPEAKER {activeSpeaker.number}
                </span>
              </div>

              {/* DETAILS COLUMN */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] tracking-[0.25em] text-[#287A73] font-medium border border-[#287A73]/30 px-2.5 py-1 rounded-full uppercase">
                    {activeSpeaker.location}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[#8C877D] uppercase">
                    NANAVU CONCLAVE
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#29312F] leading-tight">
                  {activeSpeaker.name}
                </h3>

                <p className="mt-2 text-xs md:text-sm tracking-wider text-[#C99A72] font-medium uppercase">
                  {activeSpeaker.role}
                </p>

                {activeSpeaker.topic && (
                  <div className="mt-5">
                    <span className="not-italic text-[#C99A72] uppercase text-[10px] tracking-widest block mb-1 font-semibold">Session Topic</span>
                    <p className="text-sm md:text-base font-medium italic text-[#287A73]">
                      "{activeSpeaker.topic}"
                    </p>
                  </div>
                )}

                <div className="mt-6 border-t border-[#29312F]/15 pt-6">
                  {activeSpeaker.detailedDescription.map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-sm md:text-base leading-relaxed text-nana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vu-deepstone font-light last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#29312F]/15 text-xs text-[#8C877D]">
                  <span className="tracking-widest">TKM COLLEGE OF ENGINEERING</span>
                  <button
                    onClick={() => setActiveSpeaker(null)}
                    className="text-[#287A73] font-medium hover:underline tracking-wider"
                  >
                    CLOSE DETAILS ↑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Speakers;
