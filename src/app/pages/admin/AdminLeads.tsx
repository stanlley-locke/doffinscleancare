import { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Calendar, Clock, Filter, Search, Download, Trash2, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesFilter = filter === 'all' || l.type === filter;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.phone.includes(search) || 
                          l.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportToCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Service', 'Location', 'Message', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      l.type,
      `"${l.name}"`,
      l.email,
      l.phone,
      `"${l.service}"`,
      `"${l.location}"`,
      `"${l.message?.replace(/"/g, '""') || ''}"`,
      new Date(l.createdAt).toLocaleString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `doffins_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Customer <span className="text-secondary italic">Leads</span>
          </h1>
          <p className="text-slate-500 font-light mt-1 tracking-wide uppercase text-[10px] sm:text-xs font-bold">Monitor every inquiry and booking</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={exportToCSV}
            disabled={leads.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 border border-slate-200 text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all text-[10px] font-black tracking-[0.2em] uppercase disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <Download className="h-4 w-4 group-hover:-translate-y-1 transition-transform" /> 
            DATA EXPORT (.CSV)
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select 
            className="bg-slate-50 border-none outline-none text-xs font-bold uppercase tracking-widest p-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">ALL LEADS</option>
            <option value="booking">BOOKINGS ONLY</option>
            <option value="inquiry">INQUIRIES ONLY</option>
          </select>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name, phone, or service..."
            className="w-full bg-slate-50 border border-slate-100 p-3 pl-12 text-sm outline-none focus:border-primary transition-all rounded-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 italic">Accessing database...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-slate-400 italic bg-white border border-slate-100">No matching leads found.</div>
        ) : (
          filteredLeads.map((lead, i) => (
            <motion.div 
              key={lead.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-100 p-8 shadow-sm group hover:border-primary transition-all relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                <div className="flex gap-10">
                  <div className={`h-20 w-20 flex flex-col items-center justify-center shrink-0 font-bold border-2 ${lead.type === 'booking' ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-blue-100 bg-blue-50 text-blue-600'}`}>
                    <span className="text-2xl">{lead.name[0]}</span>
                    <span className="text-[10px] tracking-widest uppercase opacity-50">{lead.type.slice(0, 4)}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>{lead.name}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> {lead.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" /> {lead.email}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:flex gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-10">
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Service Requested</p>
                    <p className="text-lg font-bold text-primary">{lead.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Location</p>
                    <p className="text-sm font-medium">{lead.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Submitted On</p>
                    <p className="text-sm font-medium">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {lead.message && (
                <div className="mt-8 p-6 bg-slate-50 border-l-4 border-secondary text-slate-600 text-sm leading-relaxed italic font-light">
                  "{lead.message}"
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center pt-10">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-black flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" /> End of Lead Activity Feed
          </p>
      </div>
    </div>
  );
}
