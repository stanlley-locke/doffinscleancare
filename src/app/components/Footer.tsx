import { Link } from 'react-router';
import { Facebook, Instagram, MessageSquare, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="w-full">
      {/* Pre-Footer CTA */}
      <section className="py-24 bg-primary text-white border-b border-white/10 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let us restore <span className="text-secondary italic">freshness</span> to your space today
              </h2>
              <p className="text-xl mb-12 text-white/70 font-light tracking-wide uppercase">
                Professional Cleaning & Pest Control Excellence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="https://wa.me/254704470840"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white text-primary px-10 py-5 font-bold hover:bg-secondary transition-all flex items-center gap-3 shadow-2xl shadow-black/20"
                >
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <Link
                  to="/book"
                  className="group border-2 border-white/30 text-white px-10 py-5 font-bold hover:bg-white hover:text-primary hover:border-white transition-all flex items-center gap-3"
                >
                  Book Your Service
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="bg-primary text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Column */}
            <div className="space-y-8">
              <Link to="/" className="inline-block group">
                <div className="bg-white p-2 rounded-md shadow-xl shadow-secondary/10 group-hover:scale-110 transition-transform duration-500">
                  <img src="/doffinslogo.png" alt="Doffins CleanCare" className="h-16 w-auto" />
                </div>
              </Link>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Doffins <span className="text-secondary">CleanCare</span>
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-lg">
                  Premium cleaning and pest control solutions for residential and commercial spaces across Kenya.
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                  A brand of Doffins & Co. Ltd
                </p>
              </div>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/share/18CAEMDG1J/" },
                  { Icon: Instagram, href: "https://www.instagram.com/doffins_carpet_care" },
                  { Icon: MessageSquare, href: "https://wa.me/254704470840" }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-10 w-10 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all"
                  >
                    <item.Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xl font-bold mb-10 tracking-tight border-b-2 border-secondary pb-4 inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Services', 'Pricing', 'Contact', 'Sitemap'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} 
                      className="text-white/60 hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-[1px] bg-secondary transition-all group-hover:w-4" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-xl font-bold mb-10 tracking-tight border-b-2 border-secondary pb-4 inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Services
              </h4>
              <ul className="space-y-4">
                {[
                  'Carpet Cleaning', 
                  'Sofa Set Cleaning', 
                  'Mattress Cleaning', 
                  'Deep House Cleaning', 
                  'Office Cleaning', 
                  'Pest Control'
                ].map((service) => (
                  <li key={service}>
                    <Link to="/services" className="text-white/60 hover:text-secondary transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-secondary transition-all group-hover:w-4" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-xl font-bold mb-10 tracking-tight border-b-2 border-secondary pb-4 inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact Us
              </h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <a href="tel:0704470840" className="flex items-center gap-4 text-white/60 hover:text-secondary transition-all group">
                    <div className="h-10 w-10 border border-white/10 flex items-center justify-center group-hover:border-secondary transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/40">Mobile</p>
                      <p className="font-medium text-lg">0704 470 840</p>
                    </div>
                  </a>
                  <a href="tel:0704177280" className="flex items-center gap-4 text-white/60 hover:text-secondary transition-all group">
                    <div className="h-10 w-10 border border-white/10 flex items-center justify-center group-hover:border-secondary transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/40">Alternative</p>
                      <p className="font-medium text-lg">0704 177 280</p>
                    </div>
                  </a>
                </div>
                
                <a href="mailto:doffinscoltd@gmail.com" className="flex items-center gap-4 text-white/60 hover:text-secondary transition-all group">
                  <div className="h-10 w-10 border border-white/10 flex items-center justify-center group-hover:border-secondary transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">Email</p>
                    <p className="font-medium text-base truncate max-w-[180px]">doffinscoltd@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/60 group">
                  <div className="h-10 w-10 border border-white/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">Location</p>
                    <p className="font-medium text-lg">Serving across Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 text-center text-white/30 text-[10px] sm:text-xs tracking-widest uppercase font-black">
            <p>&copy; {new Date().getFullYear()} <span className="text-secondary">Doffins & Co. Ltd</span>. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
