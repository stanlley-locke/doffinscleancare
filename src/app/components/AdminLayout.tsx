import { useState, useEffect } from 'react';
import { LayoutDashboard, Tag, MessageSquare, LogOut, ChevronRight, Home, TrendingUp, Users, Clock, ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import logo from '../../imports/doffinscoltd_logo.jpeg';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Basic Auth Check
  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (!isAdmin && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [location.pathname, navigate]);

  // Handle window resizing to close mobile drawer on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 20);
    };
    const mainContent = document.getElementById('admin-main-content');
    mainContent?.addEventListener('scroll', handleScroll);
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Services Manager', path: '/admin/services', icon: Tag },
    { name: 'Leads & Inquiries', path: '/admin/leads', icon: MessageSquare },
  ];

  if (location.pathname === '/admin/login') {
    return <Outlet />;
  }

  const handleLogout = () => {
    localStorage.removeItem('is_admin');
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const SidebarContent = ({ isCollapsible = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-8 border-b border-white/5 flex items-center gap-6 overflow-hidden">
        <div className="h-12 w-12 bg-white flex items-center justify-center shrink-0 shadow-lg overflow-hidden border border-white/10 group">
           <img 
             src={logo} 
             alt="Doffins Logo" 
             className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
           />
        </div>
        <AnimatePresence>
          {(!isCollapsible || isSidebarOpen) && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="whitespace-nowrap"
            >
              <div className="font-black text-xl tracking-tighter leading-none">DOFFINS</div>
              <div className="text-[10px] text-secondary font-black tracking-[0.3em] uppercase opacity-80 mt-1">Admin Portal</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10">
        <ul className="space-y-3 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const labelVisible = !isCollapsible || isSidebarOpen;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className={`flex items-center gap-5 p-4 transition-all duration-300 group relative rounded-sm ${
                    isActive 
                      ? 'bg-secondary text-primary shadow-lg shadow-secondary/10 translate-x-2' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'stroke-[3px]' : 'stroke-2'}`} />
                  {labelVisible && (
                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-6 border-t border-white/5 bg-black/10 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 p-4 bg-white/5 hover:bg-red-500/10 hover:text-red-400 w-full transition-all text-white/30 text-[10px] font-black uppercase tracking-widest rounded-sm group"
        >
          <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {(!isCollapsible || isSidebarOpen) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-80 bg-primary text-white z-[70] shadow-2xl lg:hidden"
          >
             <SidebarContent />
             <button 
               onClick={() => setIsMobileDrawerOpen(false)}
               className="absolute top-8 right-6 text-white/40 hover:text-white transition-colors"
             >
                <X className="h-6 w-6" />
             </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 88 }}
        className="hidden lg:flex bg-primary text-white flex-col z-50 relative shadow-[10px_0_40px_rgba(0,0,0,0.1)] border-r border-white/5"
      >
        <SidebarContent isCollapsible={true} />

        {/* Toggle Sidebar Collapse */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-secondary text-primary flex items-center justify-center shadow-xl border border-white/10 hover:scale-110 transition-transform"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        {/* Mobile Top Header */}
        <header className="lg:hidden h-20 bg-primary text-white flex items-center justify-between px-6 shrink-0 z-40">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white p-1 rounded-sm">
                 <img src={logo} alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div className="font-black text-sm tracking-tighter">DOFFINS ADMIN</div>
           </div>
           <button 
             onClick={() => setIsMobileDrawerOpen(true)}
             className="p-2 bg-white/5 rounded-sm active:scale-95 transition-all text-secondary"
           >
              <Menu className="h-6 w-6" />
           </button>
        </header>

        {/* Desktop Dynamic Page Title Header */}
        <header className={`hidden lg:flex h-24 items-center px-12 transition-all duration-300 z-40 shrink-0 ${scrolled ? 'bg-white shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck className="h-3 w-3 text-secondary" />
              <span>Doffins Admin Portal</span>
              <span className="opacity-20">/</span>
              <span className="text-primary">{navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}</span>
           </div>
        </header>

        {/* Dynamic Outlet Main Content */}
        <main 
          id="admin-main-content"
          className="flex-1 overflow-y-auto px-6 md:px-12 pb-24 pt-4"
        >
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
