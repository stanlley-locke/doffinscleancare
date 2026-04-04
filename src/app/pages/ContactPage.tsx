import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, Calendar, MessageSquare, ArrowRight, ClipboardList, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'inquiry' }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Trigger mailto after successful DB update
        const subject = encodeURIComponent(`New Inquiry: ${formData.service || 'General'}`);
        const body = encodeURIComponent(
          `Hello Doffins CleanCare,\n\nI have just submitted an inquiry on your website with the following details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nLocation: ${formData.location}\n\nMessage:\n${formData.message}\n\nPlease get back to me with a quote.`
        );
        
        // Use a small timeout to ensure the UI updates first
        setTimeout(() => {
          window.location.href = `mailto:doffinscoltd@gmail.com?subject=${subject}&body=${body}`;
        }, 500);

        setFormData({ name: '', email: '', phone: '', service: '', location: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      // Fallback to mailto if API fails
      const subject = encodeURIComponent(`Service Request (Direct): ${formData.service || 'General'}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nLocation: ${formData.location}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:doffinscoltd@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Doffins CleanCare</title>
        <meta name="description" content="Contact Doffins CleanCare for professional cleaning and pest control services. Call 0704 470 840, email doffinscoltd@gmail.com, or book online. Nairobi, Kenya." />
        
        {/* JSON-LD Contact & Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Doffins CleanCare",
              "description": "Get in touch with Nairobi's premier cleaning specialists.",
              "mainEntity": {
                "@type": "Organization",
                "name": "Doffins & Co. Ltd",
                "telephone": "+254704470840",
                "email": "doffinscoltd@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Nairobi CBD",
                  "addressLocality": "Nairobi",
                  "addressCountry": "KE"
                }
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
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact",
                  "item": "https://doffinscleancare.co.ke/contact"
                }
              ]
            }
          ])}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-48 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2000"
            alt="Get In Touch"
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
                Get In <span className="text-secondary italic">Touch</span>
              </h1>
              <div className="w-24 h-1 bg-secondary mb-10" />
              <p className="text-xl lg:text-3xl text-white/90 font-light tracking-wide max-w-2xl leading-relaxed">
                We are ready to restore freshness to your space. Contact us today for a <span className="text-secondary font-medium italic underline decoration-secondary/30">free, no-obligation quote</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Information Column */}
            <div className="lg:col-span-5 space-y-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-12 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact <span className="text-primary italic">Information</span>
                </h2>
                
                <div className="space-y-12">
                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Phone / WhatsApp</p>
                      <a href="tel:0704470840" className="text-xl font-bold text-slate-700 hover:text-primary transition-colors block mb-1 underline decoration-primary/10">0704 470 840</a>
                      <a href="tel:0704177280" className="text-xl font-bold text-slate-700 hover:text-primary transition-colors block">0704 177 280</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Email Address</p>
                      <a href="mailto:doffinscoltd@gmail.com" className="text-xl font-bold text-slate-700 hover:text-primary transition-colors underline decoration-primary/10 truncate block max-w-[280px] sm:max-w-none">doffinscoltd@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="h-14 w-14 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Location</p>
                      <p className="text-xl font-bold text-slate-700">Nairobi, Kenya</p>
                      <p className="text-slate-500 font-light mt-1 italic leading-tight">Serving Nairobi & surrounding areas</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-12 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Clock className="h-24 w-24 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Calendar className="h-6 w-6 text-primary" />
                  Business Hours
                </h3>
                <div className="space-y-4">
                  {[
                    { d: "Monday - Friday", h: "7:00 AM - 7:00 PM" },
                    { d: "Saturday", h: "8:00 AM - 6:00 PM" },
                    { d: "Sunday", h: "9:00 AM - 5:00 PM" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-3 last:border-0 hover:border-primary transition-colors group">
                      <span className="text-slate-500 font-medium group-hover:text-primary transition-colors">{row.d}</span>
                      <span className="font-bold text-primary">{row.h}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 py-3 px-6 bg-primary text-white font-bold uppercase tracking-widest text-xs inline-block">
                  Same-day service available
                </div>
              </motion.div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <motion.div
                className="bg-white p-12 border border-slate-100 shadow-2xl shadow-primary/5 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-10">
                  <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Request a <span className="text-primary italic">Quote</span>
                  </h2>
                  <p className="text-slate-500 font-light">Fill out the form below and our team will get back to you with a detailed quote within 1 hour.</p>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="h-20 w-20 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-full mb-6">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Request <span className="text-primary italic">Received!</span></h3>
                    <p className="text-slate-500 font-light leading-relaxed max-w-sm mb-8">
                      Thank you for contacting Doffins CleanCare. Our team will get back to you with a free quote within <span className="text-primary font-bold">1 hour</span>.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-300 rounded-sm"
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-300 rounded-sm"
                          placeholder="your.email@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-300 rounded-sm"
                          placeholder="0704 470 840"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Type of Service</label>
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all rounded-sm"
                        >
                          <option value="">Select a service...</option>
                          <option value="Carpet Cleaning">Carpet Cleaning</option>
                          <option value="Sofa Cleaning">Sofa Cleaning</option>
                          <option value="Mattress Cleaning">Mattress Cleaning</option>
                          <option value="Deep Cleaning">Deep Cleaning</option>
                          <option value="Pest Control">Pest Control</option>
                          <option value="Commercial Cleaning">Commercial Cleaning</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Your Location</label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-300 rounded-sm"
                        placeholder="Westlands, Nairobi"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Additional Details</label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-300 rounded-sm resize-none"
                        placeholder="Number of items, size, special requirements, etc."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-secondary text-white hover:text-primary font-black py-6 transition-all flex items-center justify-center gap-4 group tracking-tight disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      {isSubmitting ? 'SENDING REQUEST...' : 'SEND REQUEST'}
                      {!isSubmitting && <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Remainder */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-7xl mb-6 font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick <span className="text-primary italic">Booking</span>
              </h2>
              <p className="text-xl text-slate-500 font-light">
                For the fastest response, send us these 4 details via WhatsApp or Call
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { t: "Service Type", d: "Which service do you need?", i: <ClipboardList /> },
              { t: "Location", d: "Where are you located in Kenya?", i: <MapPin /> },
              { t: "Quantity", d: "How much cleaning is needed?", i: <CheckCircle /> },
              { t: "Quick Response", d: "We'll respond with a quote right away.", i: <MessageSquare /> }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white p-12 hover:border-secondary border border-transparent transition-all group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-primary font-black text-6xl opacity-5 mb-4 select-none group-hover:opacity-10 transition-opacity">0{i+1}</div>
                <div className="h-10 w-10 text-primary mb-6">{step.i}</div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{step.t}</h3>
                <p className="text-slate-500 text-sm">{step.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <a
              href="https://wa.me/254704470840"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-4 bg-green-600 text-white px-10 py-6 font-bold uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-600/20"
            >
              <Phone className="h-6 w-6" />
              WhatsApp: 0704 470 840
            </a>
            <a
              href="tel:0704177280"
              className="flex-1 flex items-center gap-4 border-2 border-primary text-primary px-10 py-6 font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              <Phone className="h-6 w-6" />
              Call: 0704 177 280
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
