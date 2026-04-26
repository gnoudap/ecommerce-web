import React from 'react';
import { Shield, Users, Zap, Hexagon, Heart } from 'lucide-react';

function AboutUs() {
  return (
    <div className="flex flex-col w-full -mt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500"></div>

        <div className="max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-400/20 text-indigo-300 px-4 py-2 rounded-[30px] mb-6 backdrop-blur-sm border border-violet-400/30">
            <Hexagon size={16} className="fill-current" />
            <span className="text-sm font-medium tracking-wider uppercase">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight leading-tight">
            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">Excellence</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to bring you the highest quality products with an unparalleled shopping experience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 z-20 px-5">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border border-slate-100 shadow-sm">
          {[
            { label: 'Happy Customers', value: '1B+' },
            { label: 'Premium Products', value: '1,200+' },
            { label: 'Countries Served', value: '67+' },
            { label: 'Years of Excellence', value: '10+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-5 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">Our Core Values</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            These are the principles that guide our every decision and interaction.
          </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Uncompromising Quality', desc: 'We source only the finest materials and work with elite artisans.', color: 'text-violet-500', bg: 'bg-violet-500/10' },
            { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our ultimate priority. We go above and beyond.', color: 'text-pink-600', bg: 'bg-pink-50' },
            { icon: Zap, title: 'Innovation', desc: 'Constantly evolving to bring you the latest trends and best technology.', color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((val, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group shadow-sm hover:shadow-xl">
              <div className={`w-16 h-16 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <val.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{val.title}</h3>
              <p className="text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pb-24 px-5 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-slate-100 shadow-sm">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10">
              <Users size={48} className="mx-auto text-indigo-600 mb-6" />
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-display">Join Our Journey</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10">
                We are a team of passionate individuals dedicated to creating the best shopping experience for you.
                Always pushing boundaries and setting new standards.
              </p>
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25">
                Careers at Duong Pham
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
