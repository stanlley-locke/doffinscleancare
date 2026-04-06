import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Sparkles, Sofa, Bed, Home, Building2, Bug, CheckCircle, ArrowRight, Construction } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data.map((s: any) => ({ ...s, features: JSON.parse(s.features) })));
      })
      .catch(err => console.error('Failed to load services:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Services | Professional Cleaning & Pest Control Excellence</title>
        <meta name="description" content="Premium services: Professional carpet, sofa, mattress, and deep house cleaning across Kenya. Pest control and fumigation by Doffins CleanCare experts." />
        
        {/* JSON-LD Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://doffinscleancare.co.ke"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://doffinscleancare.co.ke/services"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-48 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000"
            alt="Our Services"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20 pt-12 md:pt-0">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-9xl mb-8 leading-[1.1] font-bold tracking-tight shadow-black/20 text-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Doffins <span className="text-secondary italic">Services</span>
              </h1>
              <div className="w-24 h-1 bg-secondary mb-10" />
              <p className="text-lg sm:text-xl lg:text-3xl text-white/90 font-light tracking-wide max-w-2xl leading-relaxed">
                Experience <span className="text-secondary font-medium italic underline decoration-secondary/30">professional excellence</span> in cleaning and pest control solutions for your home and office.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Services List */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="space-y-40">
            {services.map((service, idx) => {
              const IsEven = idx % 2 === 0;
              return (
                <div key={service.id} className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div 
                    className={IsEven ? "order-2 lg:order-1" : "order-2 lg:order-2"}
                    initial={{ opacity: 0, x: IsEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-14 w-14 bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/10 group-hover:bg-secondary group-hover:text-primary transition-colors duration-500">
                        <Sparkles className="h-7 w-7" />
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {service.displayName.split(' ')[0]} <span className="text-primary italic">{service.displayName.split(' ').slice(1).join(' ')}</span>
                      </h2>
                    </div>
                    
                    <div className="mb-6 flex items-baseline gap-2">
                      <span className="text-sm text-slate-400 font-medium">Starting from</span>
                      <span className="text-3xl font-black text-secondary">
                        {service.startingPrice === 0 ? "Custom Quote" : `KES ${service.startingPrice.toLocaleString()}`}
                      </span>
                      {service.startingPrice !== 0 && (
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">per {service.unit}</span>
                      )}
                    </div>

                    <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                      {service.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-6 mb-12">
                      {service.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-1" />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/book" className="group flex items-center gap-4 text-primary font-black uppercase tracking-widest text-sm hover:text-secondary transition-colors">
                      Book This Service
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </motion.div>

                  <motion.div 
                    className={IsEven ? "order-1 lg:order-2 relative" : "order-1 lg:order-1 relative"}
                    initial={{ opacity: 0, x: IsEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={`absolute ${IsEven ? '-top-6 -right-6' : '-bottom-6 -left-6'} w-full h-full border-4 border-secondary/30 -z-10 bg-secondary/5 shadow-2xl shadow-secondary/10 transition-all duration-700 group-hover:scale-105`} />
                    <ImageWithFallback
                      src={service.imageUrl || "https://images.unsplash.com/photo-1581578731522-745a05ad9ad2?q=80&w=1080"}
                      alt={service.displayName}
                      className="w-full aspect-[4/3] object-cover border border-slate-300 shadow-xl shadow-secondary/5 hover:border-secondary transition-colors duration-500"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Static CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 -skew-x-12 translate-x-20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to <span className="text-secondary italic">Get Started?</span>
            </h2>
            <p className="text-2xl text-white/70 font-light mb-12">
              Contact us today for a free, no-obligation quote and restore freshness to your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/book"
                className="bg-secondary text-primary px-12 py-6 font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl shadow-secondary/20"
              >
                Book Your Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
