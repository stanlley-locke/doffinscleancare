import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Phone, Mail, CheckCircle, ArrowRight, CornerRightDown, MapPin, ClipboardList, Send } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function PricingPage() {
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

  return (
    <>
      <Helmet>
        <title>Pricing | Doffins CleanCare </title>
        <meta name="description" content="Transparent pricing for carpet cleaning, sofa cleaning, mattress cleaning, deep cleaning, and pest control services in Nairobi. Contact us for a free quote." />
        
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
                "name": "Pricing",
                "item": "https://doffinscleancare.co.ke/pricing"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-48 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2000"
            alt="Affordable & Transparent Pricing"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-9xl mb-8 leading-tight font-bold tracking-tight shadow-black/20 text-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Guide <span className="text-secondary italic">Pricing</span>
              </h1>
              <div className="w-24 h-1 bg-secondary mb-10" />
              <p className="text-xl lg:text-3xl text-white/90 font-light tracking-wide max-w-2xl leading-relaxed mb-12">
                We believe in <span className="text-secondary font-medium italic underline decoration-secondary/30">transparency</span>. Get an instant idea of our cleaning rates below.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="tel:0704470840"
                  className="group bg-secondary text-primary px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-secondary/20"
                >
                  <Phone className="h-5 w-5" />
                  0704 470 840
                </a>
                <a
                  href="mailto:doffinscoltd@gmail.com"
                  className="group border-2 border-white/50 text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3"
                >
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide Pricing Cards */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-primary italic">Standard Rates</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                Prices vary depending on size, condition, and location. These are starting guide prices for our most requested services.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center text-slate-400 italic">Fetching current rates...</div>
            ) : (
              services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  className="group border border-slate-100 hover:border-secondary transition-all p-12 bg-white flex flex-col items-center text-center hover:shadow-2xl hover:shadow-primary/5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {service.displayName}
                    </h3>
                    <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mb-8">{service.category}</p>
                  </div>
                  
                  <div className="mb-10 flex items-baseline gap-2">
                    <span className="text-sm text-slate-400 font-medium">From</span>
                    <span className="text-4xl font-black text-primary">
                      {service.startingPrice === 0 ? "Custom" : `KES ${service.startingPrice.toLocaleString()}`}
                    </span>
                    {service.startingPrice !== 0 && (
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">/ {service.unit}</span>
                    )}
                  </div>

                  <div className="w-full border-t border-slate-50 pt-10 mb-10">
                    <ul className="space-y-4">
                      {service.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-center justify-center gap-3 text-slate-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/book" className="mt-auto group flex items-center gap-4 text-primary font-black uppercase tracking-widest text-xs hover:text-secondary transition-colors">
                    Get a Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Instant Quote Form Info */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-10 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick <span className="text-primary italic">Inquiry</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mb-10" />
              <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">
                Send us the following information and we'll respond with a customized quote <span className="text-primary font-bold">immediately</span>.
              </p>

              <div className="space-y-10">
                {[
                  { t: "Type of Service", d: "Let us know which cleaning or pest service you need.", i: <ClipboardList className="text-secondary" /> },
                  { t: "Location Address", d: "Your exact location in Nairobi or surrounding areas.", i: <MapPin className="text-secondary" /> },
                  { t: "Quantity / Size", d: "Number of items (e.g. sofa seats) or approximate square footage.", i: <Send className="text-secondary" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="h-14 w-14 bg-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-sm border border-slate-100">
                      {item.i}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.t}</h4>
                      <p className="text-slate-500 font-light leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex items-center gap-10">
                 <Link to="/book" className="bg-primary text-white px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-secondary hover:text-primary transition-all">Book Now</Link>
                 <a href="tel:0704470840" className="text-primary font-black uppercase tracking-widest text-sm hover:underline decoration-secondary/30">Call: 0704 470 840</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-full h-full border-2 border-primary/10 -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwZnVybml0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MTQ3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Request a quote"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-10 border border-white/20 text-white min-w-[280px]">
                 <p className="text-xs uppercase tracking-widest font-black mb-4 flex items-center gap-2 decoration-secondary underline">
                    <CornerRightDown className="h-4 w-4 text-secondary" /> Instant Quote
                 </p>
                 <h4 className="text-4xl font-bold mb-4 italic" style={{ fontFamily: "'Playfair Display', serif" }}>We'll respond within <span className="text-secondary">60 min</span></h4>
                 <p className="text-white/60 font-medium">Doffins CleanCare operational standards.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
