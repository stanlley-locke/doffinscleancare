import { useState, useEffect } from 'react';
import { Tag, Save, RotateCcw, CheckCircle, AlertCircle, Plus, Trash2, Edit3, Image, List, Settings, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Form State
  const [formData, setFormData] = useState<any>({
    displayName: '',
    name: '',
    description: '',
    startingPrice: 0,
    unit: '',
    category: 'Cleaning',
    features: [''],
    imageUrl: '',
    displayOrder: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.map((s: any) => ({ ...s, features: JSON.parse(s.features) })));
    } catch (err) {
      console.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({ ...service });
    setIsAddingNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const method = editingId ? 'PATCH' : 'POST';
    const payload = editingId ? { ...formData, id: editingId } : { ...formData, name: formData.displayName.toLowerCase().replace(/ /g, '_') };

    try {
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage({ text: editingId ? 'Service updated successfully!' : 'New service created!', type: 'success' });
        setEditingId(null);
        setIsAddingNew(false);
        fetchServices();
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessage({ text: 'Operation failed.', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Service deleted.', type: 'success' });
        fetchServices();
      }
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleFeatureChange = (index: number, val: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = val;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureRow = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureRow = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Service <span className="text-secondary italic">Manager</span>
          </h1>
          <p className="text-slate-500 font-light mt-1 tracking-wide uppercase text-xs font-bold">Configure entire catalog dynamically</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-sm mr-4">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
          {!editingId && !isAddingNew && (
            <button 
              onClick={() => { setIsAddingNew(true); setFormData({ displayName: '', description: '', startingPrice: 0, unit: '', category: 'Cleaning', features: [''], imageUrl: '', displayOrder: 0 }); }}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all"
            >
              <Plus className="h-4 w-4" /> Add New Service
            </button>
          )}
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

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* List Column */}
        <div className={editingId || isAddingNew ? 'lg:col-span-4 opacity-50' : 'lg:col-span-12'}>
          {loading ? (
            <div className="py-20 text-center text-slate-400 italic">Accessing database...</div>
          ) : viewMode === 'list' ? (
            <div className="space-y-6">
              {services.map((service) => (
                <motion.div 
                  key={service.id}
                  className="bg-white border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-primary transition-all relative overflow-hidden"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                      <img src={service.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={service.displayName} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>{service.displayName}</h3>
                      <p className="text-xs text-slate-400 font-black tracking-widest uppercase mt-1">
                        KES {service.startingPrice.toLocaleString()} / {service.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEdit(service)} className="h-10 w-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="h-10 w-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <motion.div 
                  key={service.id}
                  className="bg-white border border-slate-100 overflow-hidden shadow-sm flex flex-col group hover:border-primary transition-all relative"
                >
                  <div className="h-48 bg-slate-50 overflow-hidden border-b border-slate-100">
                    <img src={service.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={service.displayName} />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{service.displayName}</h3>
                      <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase mt-2">
                        KES {service.startingPrice.toLocaleString()} / {service.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                      <button onClick={() => handleEdit(service)} className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest border border-slate-100 text-slate-400 hover:text-primary hover:bg-slate-50 transition-all">
                        <Edit3 className="h-3 w-3" /> EDIT
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-2 border border-slate-100 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Editor Modal Overlay */}
        <AnimatePresence>
          {(editingId || isAddingNew) && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="lg:col-span-8 bg-white border border-slate-200 shadow-2xl p-10 relative z-20"
            >
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-100">
                <h2 className="text-3xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {editingId ? 'Edit' : 'Add New'} <span className="text-primary">Service</span>
                </h2>
                <button onClick={() => { setEditingId(null); setIsAddingNew(false); }} className="text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs">Cancel</button>
              </div>

              <form onSubmit={handleSave} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Display Name</label>
                    <input type="text" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all">
                      <option value="Cleaning">Cleaning</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Pest Control">Pest Control</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" required />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Starting Price (KES)</label>
                    <input type="number" value={formData.startingPrice} onChange={(e) => setFormData({...formData, startingPrice: e.target.value})} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Unit (e.g. sqf / set)</label>
                    <input type="text" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Order weight</label>
                    <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: e.target.value})} className="w-full bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black flex items-center justify-between">
                    Feature List (Bullet Points)
                    <button type="button" onClick={addFeatureRow} className="text-primary flex items-center gap-1 font-black">
                      <Plus className="h-3 w-3" /> ADD POINT
                    </button>
                  </label>
                  <div className="space-y-3">
                    {formData.features.map((feat: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input 
                          type="text" 
                          value={feat} 
                          onChange={(e) => handleFeatureChange(i, e.target.value)} 
                          className="flex-1 bg-slate-50 p-3 border-0 focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
                          placeholder="Professional depth extraction..."
                        />
                        <button type="button" onClick={() => removeFeatureRow(i)} className="p-3 text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Image URL (Unsplash or direct link)</label>
                  <div className="flex gap-4">
                    <div className="h-14 w-14 bg-slate-100 shrink-0 overflow-hidden">
                       <img src={formData.imageUrl} className="w-full h-full object-cover" />
                    </div>
                    <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-slate-50 p-4 border-0 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="https://images.unsplash.com/..." />
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-secondary font-black py-6 uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3">
                  <Save className="h-5 w-5" /> PERSIST TO DATABASE
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
