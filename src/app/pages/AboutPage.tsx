import { Helmet } from 'react-helmet-async';
import { Users, Target, Eye, CheckCircle, Award, Shield, Clock, Zap, Leaf, ShieldCheck, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Professional Cleaning & Pest Control Excellence</title>
        <meta name="description" content="Discover the journey of Doffins CleanCare since 2019, growing into Kenya's most trusted partner for professional cleaning and pest control. Registered company Doffins & Co. Ltd." />
        
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
                "name": "About Us",
                "item": "https://doffinscleancare.co.ke/about"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-48 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=1080"
            alt="About Doffins CleanCare"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-9xl mb-8 leading-tight font-bold tracking-tight shadow-black/20 text-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                About <span className="text-secondary italic">Doffins</span>
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto mb-10" />
              <p className="text-xl lg:text-3xl text-white/90 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                Your trusted partner for professional <span className="text-secondary font-medium italic">excellence</span> in cleaning and pest control.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are & History */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-12 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Who We <span className="text-primary italic border-b-4 border-secondary/30">Are</span>
              </h2>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  Doffins CleanCare is a premier cleaning and pest control service provider in Kenya, dedicated to delivering exceptional results for both residential and commercial clients.
                </p>
                
                <div className="relative pl-10 border-l-2 border-secondary/20 space-y-12 py-4">
                  <div className="relative">
                    <div className="absolute -left-[46px] top-0 w-3 h-3 rounded-full bg-secondary ring-8 ring-secondary/10" />
                    <p>
                      Our journey began in <span className="font-bold text-primary">2019</span> as <span className="italic">Brute Force Cleaning Services and Pest Control</span>.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[46px] top-0 w-3 h-3 rounded-full bg-secondary shadow-[0_0_15px_rgba(212,164,69,0.5)]" />
                    <p>
                      In <span className="font-bold text-primary">2023</span>, we rebranded to <span className="italic">Novcare Cleaning and Pest Control</span> as we refined our services and redefined the customer experience.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[46px] top-0 w-3 h-3 rounded-full bg-secondary ring-8 ring-secondary/20 shadow-[0_0_20px_rgba(212,164,69,0.3)]" />
                    <p>
                      In <span className="font-bold text-primary">2025</span>, we officially became a registered company—<span className="font-bold text-primary italic">Doffins & Co. Ltd</span>—marking a new chapter of professional excellence and rapid growth.
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mt-10">
                  Note: Doffins CleanCare is a brand name of Doffins & Co. Ltd
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 -z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 -z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1080"
                alt="Professional cleaning team at work"
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 border border-slate-200"
              />
              <div className="absolute top-10 right-10 bg-white p-8 border border-slate-300 shadow-2xl skew-y-3">
                <p className="text-primary font-black text-6xl leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>06+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-2">Years Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              className="group bg-white p-16 border border-slate-300 border-t-4 border-t-primary hover:border-primary transition-all relative overflow-hidden hover:shadow-2xl hover:shadow-primary/5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Target className="h-32 w-32 text-primary" />
              </div>
              <div className="h-16 w-16 bg-primary/5 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-3xl mb-6 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-primary italic">Mission</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                To deliver reliable, high-quality cleaning and pest control services that create clean, safe, and healthy environments for our community.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-16 border border-slate-300 border-t-4 border-t-secondary hover:border-secondary transition-all relative overflow-hidden hover:shadow-2xl hover:shadow-secondary/5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Eye className="h-32 w-32 text-secondary" />
              </div>
              <div className="h-16 w-16 bg-secondary/10 flex items-center justify-center text-secondary mb-10 group-hover:bg-secondary group-hover:text-primary transition-colors duration-500 rounded-none">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-3xl mb-6 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-secondary italic">Vision</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                To become the most trusted and preferred cleaning and pest control service provider in Kenya, known for our integrity and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-primary italic">Leadership</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Meet the team driving our vision forward with passion and professionalism.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              {
                name: "Douglas Omoke",
                role: "Finance & Operations Director",
                desc: "Overseeing service delivery, quality, and operational efficiency to ensure excellence in every project we undertake.",
              },
              {
                name: "Griffins Otuke",
                role: "Marketing & Sales Director",
                desc: "Responsible for client growth and brand development, connecting our services with the homes and businesses that need them.",
              }
            ].map((leader, idx) => (
              <motion.div
                key={idx}
                className="group border border-slate-300 border-t-4 border-t-secondary/30 hover:border-secondary transition-all p-12 relative bg-white hover:shadow-2xl hover:shadow-secondary/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-8">
                  <div className="h-24 w-24 bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/10 shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors duration-500">
                    <User className="h-10 w-10" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {leader.name}
                    </h3>
                    <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-6 px-3 py-1 border border-secondary/20 inline-block">
                      {leader.role}
                    </p>
                    <p className="text-slate-500 leading-relaxed italic">
                      "{leader.desc}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl mb-6 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Clients <span className="text-primary italic">Choose Us</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Experience",
                desc: "Since 2019, serving residential and commercial clients across Kenya.",
                icon: <Clock className="h-8 w-8" />
              },
              {
                title: "Professional",
                desc: "A fully registered company with a highly trained and dedicated staff.",
                icon: <ShieldCheck className="h-8 w-8" />
              },
              {
                title: "Reliable",
                desc: "Offering same-day service and flexible scheduling to fit your needs.",
                icon: <Zap className="h-8 w-8" />
              },
              {
                title: "Quality",
                desc: "Using state-of-the-art modern equipment and eco-friendly products.",
                icon: <Award className="h-8 w-8" />
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-10 border border-slate-300 border-t-4 border-t-secondary/20 hover:border-secondary transition-all hover:shadow-2xl hover:shadow-secondary/10 text-center group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 text-secondary mb-8 group-hover:bg-secondary group-hover:text-primary transition-colors duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl mb-4 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {benefit.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light">
                  {benefit.desc}
                </p>
                <div className="mt-8 w-12 h-1 bg-slate-100 mx-auto group-hover:w-full group-hover:bg-secondary transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
