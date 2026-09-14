function Register() {
  return (
    <section
      id="register"
      className="min-h-screen bg-[#1E2523] text-[#F3EFE6] flex items-center justify-center px-6 py-32"
    >
      <div className="text-center max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.4em] text-xs text-[#287A73]">
          BE PART OF THE FUTURE
        </p>

        <h2 className="text-[14vw] md:text-[8vw] leading-none font-light tracking-tight mt-4 text-[#F3EFE6]">
          REGISTER FOR NANAVU
        </h2>

        <p className="mt-6 text-sm md:text-base text-[#8C877D] max-w-xl mx-auto leading-relaxed font-light">
          Join students, architects, engineers, and sustainability practitioners at TKM College of Engineering, Kollam.
        </p>

        {/* REGISTRATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-[#29312F] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.2em] text-[#D8C7A5] font-medium">01 / STUDENTS</span>
              <h3 className="text-xl font-light mt-2 text-[#F3EFE6]">Student Pass</h3>
              <p className="text-xs text-[#8C877D] mt-2 leading-relaxed">Full access to technical sessions, panel discussions, ideathon, and expo.</p>
            </div>
            <a
              href="mailto:nanavuu26@gmail.com?subject=Student%20Registration%20-%20NANAVU"
              className="mt-6 border border-[#287A73] text-[#287A73] hover:bg-[#287A73] hover:text-[#F3EFE6] text-center py-3 rounded-xl text-xs tracking-wider font-medium transition-all"
            >
              REGISTER DELEGATE →
            </a>
          </div>

          <div className="bg-[#29312F] p-6 rounded-2xl border border-[#287A73]/40 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[9px] tracking-[0.2em] text-[#287A73] font-medium">02 / PROFESSIONALS</span>
              <h3 className="text-xl font-light mt-2 text-[#F3EFE6]">Professional Pass</h3>
              <p className="text-xs text-[#8C877D] mt-2 leading-relaxed">Architects, engineers, researchers & industry experts networking session.</p>
            </div>
            <a
              href="mailto:nanavuu26@gmail.com?subject=Professional%20Registration%20-%20NANAVU"
              className="mt-6 bg-[#287A73] text-[#F3EFE6] hover:bg-[#287A73]/80 text-center py-3 rounded-xl text-xs tracking-wider font-medium transition-all"
            >
              REGISTER PROFESSIONAL →
            </a>
          </div>

          <div className="bg-[#29312F] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.2em] text-[#C99A72] font-medium">03 / INSTITUTIONS</span>
              <h3 className="text-xl font-light mt-2 text-[#F3EFE6]">Institutional Delegation</h3>
              <p className="text-xs text-[#8C877D] mt-2 leading-relaxed">Group registrations for colleges, sustainability councils, and faculty delegations.</p>
            </div>
            <a
              href="mailto:nanavuu26@gmail.com?subject=Institutional%20Delegation%20-%20NANAVU"
              className="mt-6 border border-[#C99A72] text-[#C99A72] hover:bg-[#C99A72] hover:text-[#29312F] text-center py-3 rounded-xl text-xs tracking-wider font-medium transition-all"
            >
              REGISTER INSTITUTION →
            </a>
          </div>
        </div>

        {/* CONTACT FOOTER */}
        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-[#8C877D] flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            Coordinator: <strong className="text-[#F3EFE6]">Prof. Basithali E.K.</strong> (+91 9847811979)
          </p>
          <p>
            Email: <a href="mailto:nanavuu26@gmail.com" className="text-[#287A73] underline">nanavuu26@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;