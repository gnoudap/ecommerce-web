import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Mail, Phone, MapPin, ArrowRight, Rss, Globe, Camera, MessageCircle } from 'lucide-react';
import { scrollToTop } from './ScrollToTop.jsx';

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 mt-auto overflow-hidden relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-16 px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-indigo-600/20 text-indigo-400 p-2 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Hexagon size={24} className="fill-current" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">
                DuongPham
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Discover a world of premium products with an unparalleled shopping experience. Quality meets elegance, right at your fingertips.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 text-slate-400"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all duration-300 text-slate-400"><MessageCircle size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all duration-300 text-slate-400"><Camera size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 text-slate-400"><Rss size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Products', 'Cart', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    onClick={scrollToTop}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group w-fit text-sm"
                  >
                    <ArrowRight size={14} className="text-transparent group-hover:text-indigo-400 -ml-4 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">Hai Chau District, Da Nang, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-400 shrink-0" />
                <span className="text-slate-400 text-sm">+84 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-400 shrink-0" />
                <span className="text-slate-400 text-sm">support@duongpham.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-slate-400 mb-4 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-12 transition-all text-sm"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 flex items-center justify-center transition-colors shadow-md"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto py-6 px-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Lumina E-Commerce. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

