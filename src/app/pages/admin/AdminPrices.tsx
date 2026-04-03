import { useState, useEffect } from 'react';
import { Tag, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminPrices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (id: number, newPrice: number) => {
    setSavingId(id);
    setMessage(null);
    try {
      const res = await fetch('/api/prices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, startingPrice: newPrice }),
      });
      if (res.ok) {
        setMessage({ text: 'Price updated successfully!', type: 'success' });
        fetchPrices();
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessage({ text: 'Failed to update price.', type: 'error' });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Service <span className="text-secondary italic">Pricing</span>
          </h1>
          <p className="text-slate-500 font-light mt-1 tracking-wide uppercase text-xs font-bold">Manage live KES starting rates</p>
        </div>
      </header>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 flex items-center gap-3 font-bold text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}
        >
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {message.text}
        </motion.div>
      )}

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 text-center text-slate-400 italic">Fetching current rates...</div>
        ) : (
          services.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-white border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-primary transition-all overflow-hidden relative"
            >
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-sm">
                  <Tag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>{service.displayName}</h3>
                  <p className="text-xs text-slate-400 font-black tracking-widest uppercase mt-1">Category: {service.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-6 border border-slate-100 group-hover:bg-white transition-all">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Starting from KES</span>
                <input 
                  type="number" 
                  defaultValue={service.startingPrice}
                  className="bg-transparent border-b-2 border-slate-200 focus:border-primary outline-none py-1 px-2 font-black text-2xl w-32 transition-all"
                  onBlur={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val !== service.startingPrice) {
                      handleUpdatePrice(service.id, val);
                    }
                  }}
                />
                <span className="text-slate-400 font-bold text-xs">/ {service.unit}</span>
                {savingId === service.id ? (
                  <RotateCcw className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Save className="h-5 w-5 text-slate-300 group-hover:text-primary transition-all" />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-8 bg-primary rounded-sm text-white relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-4 italic" style={{ fontFamily: "'Playfair Display', serif" }}>A quick tip?</h4>
          <p className="text-white/60 font-light text-sm max-w-2xl leading-relaxed">
            Updated prices reflect immediately on the **Services** and **Pricing** pages. Make sure to double-check your rates before saving as these are live changes.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-10 pointer-events-none" />
      </div>
    </div>
  );
}
