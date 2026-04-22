import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Settings } from 'lucide-react';

function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full -mt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/50 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left max-w-2xl animate-fade-in-up mt-10 lg:mt-0">
            <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6 border border-indigo-500/30 tracking-wide uppercase">
              Transform Your Lifestyle
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-200">
              Curated essentials for the modern world.
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
              Experience the pinnacle of design and functionality. Explore our premium collection crafted just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link 
                to="/products" 
                className="group inline-flex items-center justify-center gap-2 py-4 px-8 bg-indigo-600 text-white rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300 shadow-lg shadow-indigo-600/30"
              >
                Shop Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-slate-800 text-white border border-slate-700 rounded-full font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  <Settings size={18} /> Admin Console
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 rounded-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800"
               alt="Sneaker Showcase" 
               className="rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700 object-cover h-[500px] w-full mix-blend-lighten"
             />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-5 bg-slate-50 relative -mt-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Truck size={32} className="text-indigo-600" />}
              title="Free Delivery"
              description="On all orders above $150 worldwide"
            />
            <FeatureCard 
              icon={<ShieldCheck size={32} className="text-emerald-600" />}
              title="Secure Payment"
              description="Protected by 256-bit encryption"
            />
            <FeatureCard 
              icon={<RefreshCw size={32} className="text-sky-600" />}
              title="Easy Returns"
              description="30 days return policy for all items"
            />
            <FeatureCard 
              icon={<Star size={32} className="text-amber-500" />}
              title="Premium Quality"
              description="Backed by our lifetime guarantee"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm">{description}</p>
    </div>
  );
}

export default Home;
