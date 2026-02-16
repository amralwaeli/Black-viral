import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Bell, User, Search, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
const logo = "https://image2url.com/r2/default/images/1770983138178-c8e14505-7ed9-4364-991c-f88d7fbb87f5.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference !== null) {
      const isDark = darkModePreference === 'true';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [location]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'My Dashboard', path: '/dashboard' });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Black Viral AC"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    autoFocus
                    className="w-64 px-4 py-2 bg-white dark:bg-white/5 border border-cyan-500/30 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="ml-2 p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-5 h-5">
                <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>

            {/* Notifications */}
            <button className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              )}
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-cyan-500/20">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-cyan-500/30 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-center text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-gray-700 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}