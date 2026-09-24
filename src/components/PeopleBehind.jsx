import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PeopleBehind() {
  const sectionRef = useRef(null);
  const [activePerson, setActivePerson] = useState(null);

  const advisors = [
    {
      name: "Shri. P. K. Kunhalikutty",
      role: "Minister of Industries & IT",
      image: "https://www.iumlkerala.org/frontend/img/mla/pkkunhalikkutty.jpg",
      imgClass: "scale-150 translate-y-10",
      description: "Prominent Indian politician and Minister of Industries & IT.",
      detailedDescription: [
        "Shri P.K. Kunhalikutty is a prominent Indian politician, businessman, and social worker. He serves as the Minister of Industries & IT and has been a highly influential figure in Kerala politics for decades.",
        "Over his long career, he has held several key ministerial portfolios in the Government of Kerala and has been a central figure in the state's development initiatives."
      ]
    },
    {
      name: "Shri Sunny Joseph",
      role: "Minister of Environment & Climate Change",
      image: "https://envt.kerala.gov.in/wp-content/uploads/2026/06/minister_envt.png",
      description: "Minister of Environment & Climate Change and President of KPCC.",
      detailedDescription: [
        "Shri Sunny Joseph is the Minister of Environment & Climate Change. He has served in various capacities, including President of the Kannur District Congress Committee and President of the Bar Association in Mattannur.",
        "An active environmental advocate and experienced leader, he was first elected to the Kerala Legislative Assembly in 2011 and has recently taken on the role of KPCC President."
      ]
    },
    {
      name: "Jb. Shahal Hassan Musaliar",
      role: "Chairman, TKM Trust",
      image: "https://img1.wsimg.com/isteam/ip/dbca240c-c790-439b-bfb4-1ad9310347f4/1-1.png/:/cr=t:1.59%25,l:0%25,w:100%25,h:96.82%25/rs=w:472,h:629,cg:true",
      description: "Educationist and Chairman of the TKM Group of Institutions.",
      detailedDescription: [
        "Janab T.K. Shahal Hassan Musaliar is a prominent educationist and the Chairman of the TKM Group of Institutions in Kerala. He is the eldest son of the late Janab Thangal Kunju Musaliar, the renowned industrialist and philanthropist.",
        "Under his leadership, the group has continued to grow and maintain high standards of academic and technical education. In 2025, he was honored with the prestigious Kerala Sree Puraskaram by the Government of Kerala for his visionary leadership and lifelong contributions to education."
      ]
    },
  ];

  const directors = [
    {
      name: "Dr. Sadiq A",
      role: "Principal, TKMCE Kollam",
      image: "https://tkmce.ac.in/images/Dr.%20SADIQ,%20A%20(1).jpg",
      imgClass: "scale-[1.1] object-top",
      description: "Principal of TKMCE, recognized with the INAE award for innovative research.",
      detailedDescription: [
        "Dr. Sadiq A. leads TKM College of Engineering as Principal. With a distinguished career marked by innovation and academic leadership, Dr. Sadiq brings a wealth of experience to the institution.",
        "An alumnus of the University of Kerala and IIT Madras, he is a recipient of the Indian National Academy for Engineers (INAE) award for his innovative research in Mechanical Engineering. He is credited with developing a new surface finishing technology called 'Magnetorheological Abrasive Honing' (MRAH).",
        "His commitment to education extends to pioneering digital pedagogy, including the development of an innovative active learning method, 'Flip-class based group quiz'. He also authored the university textbook, 'Design and Engineering -- Basics of Product Development'.",
        "Professionally, he has served as Dean (Academic) of APJ Abdul Kalam Technological University (KTU), managing academic administration for over 1,20,000 students. At TKMCE, his leadership was instrumental in securing NBA accreditation for all UG programs and fostering a thriving ecosystem of student start-ups and funded research projects."
      ]
    },
    {
      name: "Haritha C",
      role: "Chairperson, Campus Sustainability Council(CSC), TKMCE Kollam",
      image: "https://dap.tkmce.ac.in/wp-content/uploads/2025/02/HARITHA-C.webp",
      description: "Assistant Professor at TKMCE specializing in Net-zero and low-carbon buildings.",
      detailedDescription: [
        "Haritha C is an Assistant Professor in the Department of Architecture and Planning at TKM College of Engineering, Kollam. She completed her B.Arch from NIT Calicut with a Gold medal in 2008 and holds a Master's in Sustainable Architecture from CEPT University, Ahmedabad. Before teaching, she worked with Larsen & Toubro in Chennai and Design seeds in Calicut.",
        "Her design work has been recognised nationally, with the 26th JK AYA State Young Architect's Award (2017), a Special Jury commendation at the NDTV Design & Architecture Awards, and a silver leaf at the IIA Kerala State Awards. She also received the Kerala Government's Swami Vivekanandan Yuva Prathibha Puraskaram in 2017 and was featured among twenty women architects by Vanitha Veedu in 2022.",
        "Her ongoing doctoral research at IIT Madras focuses on Net-zero and low-carbon buildings in India. She presented a part of this work at the World Sustainable Built Environment Conference (WSBE26) in Melbourne in June 2026."
      ]
    },
    {
      name: "Basithali E. K.",
      role: "Founder of naamearth",
      image: "https://www.naamearth.in/images/people/basith_ali.jpg",
      imgClass: "scale-200",
      description: "Founder NAAMEARTH | Coordinator NANAVU | Assistant Professor TKMCE Kollam.",
      detailedDescription: [
        "Basithali EK is a structural civil engineer, academician, and sustainability researcher committed to advancing natural and eco-friendly construction practices. He serves as an Assistant Professor at TKM College of Engineering, Kollam, and previously worked as a Junior Research Fellow at the Center for Sustainable Technologies (CST), Indian Institute of Science (IISc), Bengaluru, contributing to international research on carbon sequestration in soil-based construction.",
        "As the Founder Chairman of Naamearth, he leads initiatives focused on sustainable building research and practice. He is also associated with Thannal Natural Homes as a researcher and serves as Director at Coearth Foundation, integrating academic knowledge with real-world applications.",
        "With a strong academic foundation in Structural Engineering and Construction Management, along with research contributions and teaching experience, his work is driven by a vision to promote environmentally responsible construction and nurture future engineers towards a sustainable future."
      ]
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".person-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".people-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1E2523] text-[#F3EFE6] px-6 md:px-10 lg:px-16 py-32 border-t border-white/10"
    >
      <div className="mb-20 max-w-6xl mx-auto">
        <p className="people-title text-xs tracking-[0.3em] text-[#287A73] mb-4 uppercase font-medium">
          04 / THE PEOPLE BEHIND
        </p>
        <h2 className="people-title text-4xl md:text-6xl font-light tracking-tight mb-16">
          Conclave Leadership
        </h2>
      </div>

      <div className="people-grid max-w-6xl mx-auto flex flex-col gap-24">
        {/* ADVISORS */}
        <div>
          <h3 className="text-xl md:text-2xl font-light text-[#D8C7A5] mb-12 border-b border-white/10 pb-4 text-center md:text-left">
            Conclave Advisors
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12 md:gap-24">
            {advisors.map((person, idx) => (
              <div 
                key={idx} 
                onClick={() => setActivePerson(person)}
                className="person-card group flex flex-col items-center text-center max-w-sm cursor-pointer"
              >
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/5 border border-white/10 mb-6 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className={`w-full h-full object-cover ${person.imgClass || ""}`} />
                  ) : (
                    <span className="text-4xl text-white/20 font-light uppercase">{person.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xl md:text-2xl font-medium tracking-wide text-white group-hover:text-[#287A73] transition-colors">
                  {person.name}
                </span>
                <span className="text-xs md:text-sm tracking-widest text-[#8C877D] mt-2 uppercase">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DIRECTORS */}
        <div>
          <h3 className="text-xl md:text-2xl font-light text-[#D8C7A5] mb-12 border-b border-white/10 pb-4 text-center md:text-left">
            Conclave Directors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            {directors.map((person, idx) => (
              <div 
                key={idx} 
                onClick={() => setActivePerson(person)}
                className="person-card group flex flex-col items-center md:items-start text-center md:text-left cursor-pointer"
              >
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/5 border border-white/10 mb-6 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className={`w-full h-full object-cover ${person.imgClass || ""}`} />
                  ) : (
                    <span className="text-4xl text-white/20 font-light uppercase">{person.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-xl md:text-2xl font-medium tracking-wide text-white group-hover:text-[#287A73] transition-colors">
                  {person.name}
                </span>
                <span className="text-xs md:text-sm tracking-widest text-[#8C877D] mt-2 uppercase">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activePerson && (
        <div
          onClick={() => setActivePerson(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F3EFE6] text-[#29312F] rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20"
          >
            <button
              onClick={() => setActivePerson(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#29312F]/10 hover:bg-[#29312F] hover:text-[#F3EFE6] flex items-center justify-center text-lg transition-all duration-300 z-20"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-nanavu-sand">
                {activePerson.image ? (
                  <img
                    src={activePerson.image}
                    alt={activePerson.name}
                    className={`w-full h-full object-cover ${activePerson.imgClass || ""}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/10">
                    <span className="text-6xl text-black/20 font-light uppercase">{activePerson.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-7 flex flex-col justify-center">
                <h3 className="text-3xl md:text-5xl font-light tracking-[-0.03em] text-[#29312F] mb-4">
                  {activePerson.name}
                </h3>
                <p className="text-xs md:text-sm text-[#287A73] uppercase tracking-widest font-medium mb-8">
                  {activePerson.role}
                </p>

                <div className="space-y-4">
                  {activePerson.detailedDescription?.map((paragraph, idx) => (
                    <p key={idx} className="text-sm md:text-base leading-relaxed text-[#29312F]/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PeopleBehind;
