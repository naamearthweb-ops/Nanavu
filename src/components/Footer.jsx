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
            Nurturing the Futures
          </p>
        </div>

        {/* SOCIALS */}
        <div className="md:col-span-4">
          <h3 className="text-xs tracking-[0.25em] text-[#287A73] uppercase font-medium mb-4">
            CONNECT WITH US
          </h3>
          <ul className="space-y-3 text-xs text-[#F3EFE6]/80 font-light">
            <li>
              <a href="https://www.instagram.com/nanavu_26?stkn=MW92ZmR3MXlmY3R5aA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#D8C7A5] transition-colors flex items-center gap-3 group">
                <span className="text-[#D8C7A5] transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
                Instagram
              </a>
            </li>
            <li>
              <a href="https://whatsapp.com/channel/0029Vb8prHh4Y9lf59ANBy2B" target="_blank" rel="noopener noreferrer" className="hover:text-[#D8C7A5] transition-colors flex items-center gap-3 group">
                <span className="text-[#D8C7A5] transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </span>
                WhatsApp
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-[#D8C7A5] transition-colors flex items-center gap-3 group">
                <span className="text-[#D8C7A5] transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </span>
                LinkedIn
              </a>
            </li> */}
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
            <p><strong className="text-[#D8C7A5]">Email:</strong> nanavu.tkm@gmail.com </p>
            <p className="text-[10px] text-[#8C877D] mt-3">TKM College of Engineering, Kollam, Kerala</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#8C877D] tracking-wider">
        <p>© 2026 NANAVU. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 md:mt-0">TKM COLLEGE OF ENGINEERING · KOLLAM</p>
      </div>
    </footer>
  );
}

export default Footer;