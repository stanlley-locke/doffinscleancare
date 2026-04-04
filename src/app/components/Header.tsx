import { Link, useLocation } from 'react-router';
import { Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const isHomePage = location.pathname === '/';
  const shouldShowTransparent = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        shouldShowTransparent || mobileMenuOpen
          ? 'bg-transparent py-6 md:py-8' 
          : 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-primary/5 py-4'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group relative z-[110]">
            <div className="relative overflow-hidden rounded-md bg-white p-1 shadow-xl shadow-primary/5 transition-all duration-500 group-hover:scale-110">
              <img src="/doffinslogo.png" alt="Doffins CleanCare" className="h-10 md:h-12 w-auto" />
            </div>
            <div className="ml-4 flex flex-col">
              <span className={`font-black text-xl md:text-2xl tracking-tighter leading-none ${shouldShowTransparent || mobileMenuOpen ? 'text-white' : 'text-primary'}`}>
                DOFFINS
              </span>
              <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-1 ${shouldShowTransparent || mobileMenuOpen ? 'text-secondary' : 'text-secondary'}`}>
                CleanCare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12" itemScope itemType="http://schema.org/SiteNavigationElement">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                itemProp="url"
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-110 relative py-2 ${
                  isActive(link.path)
                    ? (shouldShowTransparent ? 'text-secondary' : 'text-primary')
                    : (shouldShowTransparent ? 'text-white/70 hover:text-white' : 'text-slate-400 hover:text-primary')
                }`}
              >
                <span itemProp="name">{link.label}</span>
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${shouldShowTransparent ? 'bg-secondary' : 'bg-primary'}`}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/book"
              className={`px-10 py-4 font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl ${
                shouldShowTransparent 
                  ? 'bg-secondary text-primary hover:bg-white shadow-secondary/20' 
                  : 'bg-primary text-secondary hover:bg-black shadow-primary/20'
              }`}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative z-[110] p-3 rounded-sm transition-all active:scale-90 ${
              shouldShowTransparent || mobileMenuOpen ? 'text-white bg-white/5' : 'text-primary bg-primary/5'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 z-[105] bg-primary flex flex-col p-12 pt-40"
            >
               {/* Decorative background for mobile menu */}
               <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
               </div>

              <div className="flex flex-col gap-10 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-4xl font-bold tracking-tighter flex items-center justify-between group ${
                        isActive(link.path) ? 'text-secondary' : 'text-white/60 hover:text-secondary'
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`h-6 w-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${isActive(link.path) ? 'opacity-100 translate-x-0' : ''}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto relative z-10"
              >
                <Link
                  to="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-secondary text-primary block w-full px-8 py-6 text-center font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-secondary/20 hover:scale-[1.02] transition-transform active:scale-95"
                >
                  Get an Instant Quote
                </Link>
                
                <div className="mt-12 flex items-center justify-center gap-8 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                   <span>Nairobi, Kenya</span>
                   <div className="h-1 w-1 bg-secondary rounded-full" />
                   <span>Quality Guaranteed</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
