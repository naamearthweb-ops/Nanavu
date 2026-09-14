function Footer() {
  return (
    <footer className="bg-[#181D1C] text-[#F3EFE6] border-t border-white/10 px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* BRANDING */}
        <div className="md:col-span-5">
          <h2 className="text-3xl font-light tracking-[0.2em] text-[#D8C7A5]">
            NANAVU
          </h2>
          <p className="text-xs text-[#8C877D] tracking-widest mt-2 uppercase">
            Nurturing the Futures · Sustainable Conclave
          </p>
          <p className="text-xs text-[#8C877D] leading-relaxed mt-4 max-w-sm">
            Organised by Campus Sustainability Council (CSC), TKMCE Kollam jointly with Naamearth Sustainable Initiative. Aligned with Kerala's Carbon-Neutral Vision & India Net Zero 2070.
          </p>
        </div>

        {/* ORGANISERS & PARTNERS */}
        <div className="md:col-span-4">
          <h3 className="text-xs tracking-[0.25em] text-[#287A73] uppercase font-medium mb-4">
            ORGANISERS & PARTNERS
          </h3>
          <ul className="space-y-2 text-xs text-[#F3EFE6]/80 font-light">
            <li>• Campus Sustainability Council (CSC), TKMCE</li>
            <li>• Naamearth Sustainable Initiative</li>
            <li>• TKM College of Engineering (TKMCE)</li>
            <li>• TKM College Trust</li>
            <li>• COSTFORD & Laurie Baker Centre</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-3">
          <h3 className="text-xs tracking-[0.25em] text-[#287A73] uppercase font-medium mb-4">
            CONTACT CONCLAVE
          </h3>
          <div className="space-y-2 text-xs text-[#F3EFE6]/80 font-light">
            <p><strong className="text-[#D8C7A5]">Coordinator:</strong> Prof. Basithali E.K.</p>
            <p><strong className="text-[#D8C7A5]">Phone:</strong> +91 9847811979</p>
            <p><strong className="text-[#D8C7A5]">Email:</strong> nanavuu26@gmail.com</p>
            <p className="text-[10px] text-[#8C877D] mt-3">TKM College of Engineering, Kollam, Kerala</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#8C877D] tracking-wider">
        <p>© 2026 NANAVU SUSTAINABLE CONCLAVE. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 md:mt-0">TKM COLLEGE OF ENGINEERING · KOLLAM</p>
      </div>
    </footer>
  );
}

export default Footer;