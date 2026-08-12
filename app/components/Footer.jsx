import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Requires react-icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Logo & Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
                   <Link href="/" className="flex items-center gap-2.5 shrink-0">
                     <div
                       className="w-8 h-8 rounded-lg flex items-center justify-center"
                       style={{
                         background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
                       }}
                     >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                         <polyline points="21 8 21 21 3 21 3 8"/>
                         <rect x="1" y="3" width="22" height="5"/>
                         <line x1="10" y1="12" x2="14" y2="12"/>
                       </svg>
                     </div>
                     <span className="text-lg font-bold" style={{ color: "oklch(0.96 0.005 286)" }}>
                       Stock<span style={{ color: "oklch(0.72 0.18 293)" }}>Pile</span>
                     </span>
                   </Link>
            <p className="text-sm max-w-xs text-slate-500">
                A premium, high-performance cooking companion designed for home chefs and culinary professionals.
            </p>
          </div>



          {/* Socials & Connect Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Connect With Me
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Msayeem" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sayem-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-12 pt-8 border-t border-slate-800  text-xs text-slate-500">
          <p>© {currentYear} StockPile. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}