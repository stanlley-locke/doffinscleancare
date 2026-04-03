import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Shield, ArrowRight, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (isAdmin) navigate('/admin');
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('is_admin', 'true');
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Unauthorized Access. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection failure. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Image from Landing Page */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwZnVybml0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MTQ3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Doffins Admin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-20"
      >
        {/* Brand Header */}
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex h-20 w-20 bg-secondary items-center justify-center p-5 mb-8 shadow-2xl"
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl text-white font-bold tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Doffins <span className="text-secondary italic">Admin</span>
          </h1>
        </div>

        {/* Simplified Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 shadow-2xl rounded-sm">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 p-4 pr-12 text-white focus:border-secondary transition-all outline-none"
                  placeholder="Master Password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-xs italic font-medium pt-1"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-white text-primary font-black py-4 transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-12">
           <Link to="/" className="text-white/40 hover:text-secondary text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <ArrowRight className="h-3 w-3 rotate-180" /> Return to Website
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
