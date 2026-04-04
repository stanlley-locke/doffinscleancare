import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone, Mail, ArrowRight, Star, Shield, Clock, Users, Zap, Leaf, ShieldCheck, Award, ChevronDown, Quote, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      <button 
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-primary' : 'text-slate-700'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
          {question}
        </span>
        <div className={`p-2 rounded-full border border-slate-100 group-hover:border-primary/20 transition-all ${isOpen ? 'bg-primary text-white border-primary' : 'text-slate-400'}`}>
          <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-slate-500 leading-relaxed text-lg font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomePage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        // Take the first 6 services for the home page
        setServices(data.slice(0, 6));
      })
      .catch(err => console.error('Failed to load services:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Doffins CleanCare</title>
        <meta name="description" content="Professional carpet, sofa, mattress cleaning and pest control services in Nairobi. Top-rated cleaning experts with same-day service. Get a free quote now!" />
        
        {/* Open Graph / Social SEO */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Doffins CleanCare | Professional Cleaning Nairobi" />
        <meta property="og:description" content="Nairobi's most trusted partner for deep cleaning and pest control. Restore freshness to your space today." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?q=80&w=1200" />
        <meta property="og:url" content="https://doffinscleancare.co.ke" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Doffins CleanCare",
              "image": "https://doffinscleancare.co.ke/doffinslogo.png",
              "url": "https://doffinscleancare.co.ke",
              "telephone": "+254704470840",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nairobi CBD",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://facebook.com/doffinscleancare",
                "https://instagram.com/doffinscleancare"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Doffins CleanCare",
              "alternateName": "Doffins & Co. Ltd",
              "url": "https://doffinscleancare.co.ke",
              "logo": "https://doffinscleancare.co.ke/doffinslogo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254704470840",
                "contactType": "customer service",
                "areaServed": "KE",
                "availableLanguage": "English"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Doffins CleanCare",
              "url": "https://doffinscleancare.co.ke",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://doffinscleancare.co.ke/services?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://doffinscleancare.co.ke"
                }
              ]
            }
          ])}
        </script>
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwZnVybml0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MTQ3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Premium Interior Cleaning"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20 pt-32 pb-20 md:pt-40">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight shadow-black/20 text-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Premium Cleaning <br className="hidden sm:block" />
                <span className="text-secondary italic">Services in Nairobi</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
                Professional carpet, sofa, mattress cleaning and pest control solutions delivered with a 100% satisfaction guarantee.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 pb-16"
            >
               <Link to="/book" className="w-full sm:w-auto px-10 py-5 bg-secondary text-primary font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-secondary/20 flex items-center justify-center gap-3 group">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Link>
               <Link to="/services" className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                  Our Services
               </Link>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/80 border-t border-white/10 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <a href="tel:0704470840" className="flex items-center gap-3 hover:text-secondary transition-colors group">
                <div className="p-3 rounded-full border border-white/10 bg-white/5 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-white/50">Call Us</p>
                  <p className="font-semibold text-lg italic">0704 470 840 / 0704177280</p>
                </div>
              </a>
              <a href="mailto:doffinscoltd@gmail.com" className="flex items-center gap-3 hover:text-secondary transition-colors group">
                <div className="p-3 rounded-full border border-white/10 bg-white/5 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-white/50">Email Us</p>
                  <p className="font-semibold text-lg italic">doffinscoltd@gmail.com</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Choose <span className="text-primary italic">Doffins</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                At Doffins Clean Care, we focus on quality, detail, and customer satisfaction.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                title: "Trained & Professional Team",
                desc: "Our experienced team delivers exceptional results every time.",
                icon: <Users strokeWidth={1.5} className="h-7 w-7" />
              },
              {
                title: "Modern Cleaning Equipment",
                desc: "We use state-of-the-art equipment for superior cleaning.",
                icon: <Zap strokeWidth={1.5} className="h-7 w-7" />
              },
              {
                title: "Safe & Eco-Friendly Products",
                desc: "Our products are safe for your family, pets, and the environment.",
                icon: <Leaf strokeWidth={1.5} className="h-7 w-7" />
              },
              {
                title: "Fast Response & Flexible Scheduling",
                desc: "We work around your schedule with same-day service available.",
                icon: <Clock strokeWidth={1.5} className="h-7 w-7" />
              },
              {
                title: "Trusted by Homes & Businesses",
                desc: "We serve both residential and commercial clients across Nairobi.",
                icon: <ShieldCheck strokeWidth={1.5} className="h-7 w-7" />
              },
              {
                title: "Quality Guaranteed",
                desc: "We stand behind our work with a satisfaction guarantee.",
                icon: <Award strokeWidth={1.5} className="h-7 w-7" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group p-10 bg-white border border-slate-100 hover:border-secondary transition-all hover:shadow-2xl hover:shadow-primary/5 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="absolute top-0 right-0 p-2 text-slate-50 font-black text-6xl select-none group-hover:text-secondary/10 transition-colors">
                  0{idx + 1}
                </div>
                <div className="h-16 w-16 bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                  <div className="text-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {feature.desc}
                </p>
                <div className="mt-6 w-12 h-1 bg-slate-100 group-hover:w-full group-hover:bg-secondary transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-primary italic">Services</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                We offer a wide range of premium cleaning and pest control services for home and business.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
               <div className="col-span-full py-20 text-center text-slate-400 italic">Exploring our catalog...</div>
            ) : (
              services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  className="group bg-white rounded-none overflow-hidden border border-slate-200 hover:border-secondary transition-all"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                      src={service.imageUrl}
                      alt={service.displayName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-10 left-0 bg-secondary text-primary px-6 py-2 font-bold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-sm uppercase tracking-widest">
                      {service.startingPrice === 0 ? "Custom Quote" : `From KES ${service.startingPrice.toLocaleString()}`}
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {service.displayName}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <Link 
                      to="/book" 
                      className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors group/link"
                    >
                      Book Now
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-4 bg-primary text-white px-16 py-6 font-bold uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-primary/20"
              >
                View All Services
                <ArrowRight className="h-6 w-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked <span className="text-primary italic">Questions</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
            </motion.div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What areas do you serve?",
                a: "We provide cleaning and pest control services throughout Nairobi and surrounding areas including Westlands, Kilimani, Lavington, Karen, Runda, and more. Contact us to confirm service availability in your location."
              },
              {
                q: "How quickly can you provide service?",
                a: "We pride ourselves on our responsiveness and offer same-day service for most cleaning and pest control requests in the Nairobi metropolitan area. Call us early for the best availability."
              },
              {
                q: "Are your cleaning products safe?",
                a: "Absolutely. We use only premium, eco-friendly, and non-toxic cleaning agents that are safe for your family, pets, and the environment while delivering superior deep-cleaning results."
              },
              {
                q: "Do you offer commercial cleaning services?",
                a: "Yes, we provide comprehensive cleaning and fumigation solutions for offices, retail stores, warehouses, and other commercial properties across Nairobi and Kenya."
              },
              {
                q: "How do I get a quote?",
                a: "You can get a free, no-obligation quote by calling us directly at 0704 470 840, emailing doffinscoltd@gmail.com, or through our website's contact form."
              },
              {
                q: "What payment methods do you accept?",
                a: "We offer flexible payment options including M-Pesa, Cash, and Bank Transfers to make your experience as seamless and convenient as possible."
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                What Our Clients <span className="text-primary italic">Say</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Our reputation is built on the satisfaction of our residential and commercial clients.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "James Mwangi",
                role: "Homeowner, Kilimani",
                quote: "Doffins CleanCare transformed my carpets. They look brand new! The team was professional, punctual, and the service was excellent. Highly recommend!",
                stars: 5
              },
              {
                name: "Sarah Ochieng",
                role: "Business Owner, Westlands",
                quote: "We use Doffins for our office cleaning and pest control. Their attention to detail is unmatched. Our workspace has never been cleaner.",
                stars: 5
              },
              {
                name: "Michael Thompson",
                role: "Property Manager, Lavington",
                quote: "Reliable, affordable, and professional. Doffins CleanCare handles all our post-construction cleaning. They always deliver exceptional results.",
                stars: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-10 relative border border-slate-100 hover:border-secondary transition-all hover:shadow-2xl hover:shadow-primary/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Quote className="absolute top-8 right-8 h-10 w-10 text-slate-50" />
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-lg text-slate-600 italic mb-8 leading-relaxed text-slate-500">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-slate-100 pt-6 flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                    <User className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-bold text-primary tracking-tight text-lg leading-tight mb-1">{testimonial.name}</div>
                    <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
