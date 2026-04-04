import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Send, CheckCircle, ArrowRight, ClipboardList, MapPin, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'booking' }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Trigger mailto after successful DB update
        const subject = encodeURIComponent(`Booking Request: ${formData.service || 'Professional Clean'}`);
        const body = encodeURIComponent(
          `Hello Doffins CleanCare,\n\nI have just submitted a booking request on your website with the following details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nLocation: ${formData.location}\n\nMessage:\n${formData.message}\n\nPlease confirm my booking and get back to me.`
        );
        
        // Use a small timeout for UI feedback first
        setTimeout(() => {
          window.location.href = `mailto:doffinscoltd@gmail.com?subject=${subject}&body=${body}`;
        }, 500);

        setFormData({ name: '', email: '', phone: '', service: '', location: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit booking:', error);
      // Fallback to mailto if API fails
      const subject = encodeURIComponent(`Booking Request (Direct): ${formData.service || 'Professional Clean'}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nLocation: ${formData.location}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:doffinscoltd@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
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
        <title>Book Now | Doffins CleanCare</title>
        <meta name="description" content="Secure your professional cleaning or pest control service in Nairobi. Fill out our quick booking form for an instant quote." />
      </Helmet>

      <section className="relative py-32 text-white overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=1080"
              alt="Professional Cleaning Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent z-10" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-8xl mb-8 leading-tight font-bold tracking-tight shadow-black/20 text-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Book Your <span className="text-secondary italic">Professional Clean</span>
              </h1>
              <div className="w-24 h-1 bg-secondary mb-10" />
              <p className="text-xl lg:text-3xl text-white/90 font-light tracking-wide max-w-2xl leading-relaxed">
                Fill out the details below to secure your spot. Our team responds to all booking requests within <span className="text-secondary font-medium italic underline decoration-secondary/30">1 hour</span> during business hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Form Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <motion.div
                className="bg-white p-10 lg:p-16 border border-slate-100 shadow-2xl shadow-primary/5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="James Mwangi"
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="james.mwangi@gmail.com"
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="0704 470 840"
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Preferred Service</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-medium appearance-none"
                      >
                        <option value="">Select a service...</option>
                        <option value="Carpet Cleaning">Carpet Cleaning</option>
                        <option value="Sofa Set Cleaning">Sofa Set Cleaning</option>
                        <option value="Mattress Cleaning">Mattress Cleaning</option>
                        <option value="Deep House Cleaning">Deep House Cleaning</option>
                        <option value="Post Construction Cleaning">Post Construction Cleaning</option>
                        <option value="Office & Commercial Cleaning">Office & Commercial Cleaning</option>
                        <option value="Pest Control & Fumigation">Pest Control & Fumigation</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Service Location (Nairobi & Env)</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Westlands, Kilimani, Runda"
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-slate-400">Additional Details / Special Requests</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Number of items, approximate size, or any specific stains/concerns..."
                        className="w-full px-6 py-4 bg-slate-50 border-0 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none resize-none font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-secondary text-white hover:text-primary font-black py-6 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group uppercase tracking-widest disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        {isSubmitting ? 'SECURING SLOT...' : 'CONFIRM BOOKING'}
                        {!isSubmitting && <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-20">
                    <div className="h-24 w-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Thank You!</h2>
                    <p className="text-slate-500 mb-8">Your booking request has been sent. Our team will contact you shortly to confirm the details and final price.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-secondary pb-1"
                    >
                      Send another request
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Why Book <span className="text-primary italic">Online?</span></h3>
                <div className="space-y-8">
                  {[
                    { t: "Fast Tracking", d: "Online bookings are prioritized in our system for faster scheduling.", i: <ClipboardList className="text-secondary" /> },
                    { t: "Accurate Quoting", d: "Detailed info helps us provide the most precise price instantly.", i: <MapPin className="text-secondary" /> },
                    { t: "Secure Slot", d: "Reserving via our form ensures your preferred time is noted immediately.", i: <CheckCircle className="text-secondary" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="h-12 w-12 bg-slate-50 flex items-center justify-center shrink-0">
                        {item.i}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.t}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Prefer to chat?</h3>
                <p className="text-slate-500 text-sm mb-8 italic">Send the same details via WhatsApp for an immediate response from our support team.</p>
                <a
                  href="https://wa.me/254704470840"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-green-600 text-white px-8 py-5 font-bold uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-lg"
                >
                  <MessageSquare className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Freshness Timeline */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-primary italic">Process</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                From your first click to a fresh space, here is how we ensure excellence.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Visual connector line for desktop */}
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-slate-200 -z-10" />
            
            {[
              { t: "Request Quote", d: "Fill out our form or send a WhatsApp for a quick estimate.", i: "01" },
              { t: "Confirm Details", d: "Our team calls you to finalize the time, location, and price.", i: "02" },
              { t: "Professional Clean", d: "Our experts arrive on time and transform your space.", i: "03" },
              { t: "Fresh Results", d: "Enjoy your clean, healthy, and sanitized environment.", i: "04" }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className="group relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <div className="h-16 w-16 bg-white border-2 border-primary mx-auto mb-8 flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-full">
                  {step.i}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{step.t}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.d}</p>
                <div className="mt-8 w-8 h-1 bg-secondary mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking FAQ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Booking <span className="text-primary italic">Concerns</span>
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
              <p className="text-xl text-slate-500 font-light">Questions regarding your professional cleaning session.</p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need to be home during the service?",
                a: "While someone needs to grant access, you don't necessarily have to be home. Many of our clients leave us with a trusted person or property manager. We are fully insured and our team is highly vetted."
              },
              {
                q: "How soon can I get a slot?",
                a: "We often have same-day or next-day slots available in Nairobi. However, booking 2-3 days in advance ensures you get your preferred time."
              },
              {
                q: "What if I need to cancel or reschedule?",
                a: "Life happens! We offer free rescheduling up to 24 hours before your session. Just give us a call or WhatsApp."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-8 border border-slate-100 hover:border-primary/20 transition-all">
                <h4 className="text-xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{faq.q}</h4>
                <p className="text-slate-500 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
