import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, MessageSquare, Clock, ArrowUpRight, Bell, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, bookings: 0, inquiries: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        const total = data.length;
        const bookings = data.filter((l: any) => l.type === 'booking').length;
        const inquiries = data.filter((l: any) => l.type === 'inquiry').length;
        setStats({ total, bookings, inquiries, recent: data.slice(0, 5) });
      } catch (err) {
        console.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const statCards = [
    { name: 'Total Leads', val: stats.total, icon: Users, color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Bookings', val: stats.bookings, icon: Calendar, color: 'bg-emerald-500/10 text-emerald-500' },
    { name: 'Direct Inquiries', val: stats.inquiries, icon: MessageSquare, color: 'bg-amber-500/10 text-amber-500' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Operational <span className="text-secondary italic">Overview</span>
          </h1>
          <p className="text-slate-500 font-light mt-1 tracking-wide uppercase text-xs font-bold">Business performance as of today</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className={`h-12 w-12 ${card.color} flex items-center justify-center mb-6 rounded-sm`}>
              <card.icon className="h-6 w-6" />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{card.name}</p>
            <h3 className="text-4xl font-bold mt-2">{loading ? '...' : card.val}</h3>
            <div className="absolute top-4 right-4 text-emerald-500 flex items-center gap-1 text-xs font-bold">
              <ArrowUpRight className="h-4 w-4" /> 24%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Submissions</h3>
            <button className="text-primary text-xs font-black tracking-widest uppercase hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {stats.recent.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No recent leads found.</p>
            ) : (
              stats.recent.map((lead: any, i: number) => (
                <div key={i} className="flex items-center gap-4 group p-4 hover:bg-slate-50 transition-all border-l-4 border-transparent hover:border-secondary">
                  <div className={`h-12 w-12 flex items-center justify-center font-bold text-lg ${lead.type === 'booking' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {lead.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{lead.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{lead.type} • {lead.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full uppercase font-black text-slate-500">NEW</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Shot Chart */}
        <div className="bg-primary text-white p-8 relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Ready for takeoff?</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Check your weekly growth and manage service requests to accelerate your cleaning business performance.
              </p>
            </div>
            <div className="mt-12 flex items-end gap-2">
              <div className="h-24 w-4 bg-secondary group-hover:h-32 transition-all duration-700" />
              <div className="h-16 w-4 bg-white/20 group-hover:h-24 transition-all duration-700" />
              <div className="h-40 w-4 bg-secondary group-hover:h-20 transition-all duration-700" />
              <div className="h-12 w-4 bg-white/20 group-hover:h-40 transition-all duration-700" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
