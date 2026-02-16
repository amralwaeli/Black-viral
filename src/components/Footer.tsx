import { Link, useNavigate } from 'react-router';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
const logo = "https://image2url.com/r2/default/images/1770983138178-c8e14505-7ed9-4364-991c-f88d7fbb87f5.png";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleProgramClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-gray-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Column */}
          <div className="space-y-3 sm:space-y-4">
            <img src={logo} alt="Black Viral AC" className="h-12 sm:h-16 w-auto drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
            <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">
              Elite international sports academy providing world-class training and certifications in UAE.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-white/5 rounded-lg text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-white/5 rounded-lg text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-white/5 rounded-lg text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-white/5 rounded-lg text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-white/5 rounded-lg text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Programs</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/courses?category=aquatic" onClick={(e) => handleProgramClick(e, '/courses?category=aquatic')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Swimming Training</a></li>
              <li><a href="/courses?category=combat" onClick={(e) => handleProgramClick(e, '/courses?category=combat')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Combat Sports</a></li>
              <li><a href="/courses?category=team" onClick={(e) => handleProgramClick(e, '/courses?category=team')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Team Sports</a></li>
              <li><a href="/courses?category=rescue" onClick={(e) => handleProgramClick(e, '/courses?category=rescue')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Rescue & First Aid</a></li>
              <li><a href="/courses?category=online" onClick={(e) => handleProgramClick(e, '/courses?category=online')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Online Courses</a></li>
              <li><a href="/courses?category=coach" onClick={(e) => handleProgramClick(e, '/courses?category=coach')} className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Coach Certification</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/certifications" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Certifications</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Pool Management</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Partnerships</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">Corporate Training</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="break-all">admin@blackviral.club</span>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>+971 56 848 8141</span>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>United Arab Emirates</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-300 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
            <p className="text-slate-500 dark:text-gray-500 text-xs sm:text-sm">
              © {currentYear} Black Viral AC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/privacy-policy" className="text-slate-500 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-slate-500 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}