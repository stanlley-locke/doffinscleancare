import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Home, Tag, ClipboardList, Info, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function SitemapPage() {
  const links = [
    { 
      title: "Home", 
      path: "/", 
      desc: "Nairobi's #1 premium cleaning and pest control service provider. Start here to explore our offerings.",
      icon: <Home className="h-6 w-6" />
    },
    { 
      title: "Our Services", 
      path: "/services", 
      desc: "Comprehensive catalog of professional cleaning: carpet, sofa, mattress, and deep cleaning solutions.",
      icon: <Tag className="h-6 w-6" />
    },
    { 
      title: "Guide Pricing", 
      path: "/pricing", 
      desc: "Transparent rates and packages for residential and commercial cleaning projects across Nairobi.",
      icon: <ClipboardList className="h-6 w-6" />
    },
    { 
      title: "About Doffins", 
      path: "/about", 
      desc: "Learn about our 2019 founding journey, certification, mission, and the leadership of Doffins & Co. Ltd.",
      icon: <Info className="h-6 w-6" />
    },
    { 
      title: "Contact Us", 
      path: "/contact", 
      desc: "Direct access to our support team, phone numbers, and location details for immediate inquiries.",
      icon: <Phone className="h-6 w-6" />
    },
    { 
      title: "Book a Service", 
      path: "/book", 
      desc: "Secure your professional clean with our instant booking portal. Quick, easy, and reliable.",
      icon: <Calendar className="h-6 w-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap - Doffins CleanCare | Comprehensive Site Navigation</title>
        <meta name="description" content="A complete guide to the Doffins CleanCare platform. Eaily navigate between our services, pricing, about us, and booking pages." />
      </Helmet>

      <section className="py-32 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 text-primary mb-6">
                   <ShieldCheck className="h-8 w-8" />
                   <span className="text-[10px] uppercase font-black tracking-[0.4em]">Site Map</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Platform <span className="text-primary">Directory</span>
                </h1>
                <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
                <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Easily find what you're looking for. A complete index of our professional cleaning and pest control services.
                </p>
              </motion.div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {links.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className="group block p-10 bg-white border border-slate-100 hover:border-primary transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className="flex items-start gap-6">
                      <div className="h-14 w-14 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 italic group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {link.title}
                        </h3>
                        <p className="text-slate-500 font-light text-sm leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
                          {link.desc}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                          Visit Page <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-slate-200 text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Registered Doffins & Co. Ltd &bull; Nairobi, Kenya &bull; Est. 2019
               </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
