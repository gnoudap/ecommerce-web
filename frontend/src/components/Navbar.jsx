import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ShoppingCart, LogOut, Settings, Package, Home, Menu, X, Hexagon } from 'lucide-react';

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // NavLink component to keep things DRY
  const NavLink = ({ to, icon: Icon, children }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm
        ${isActive(to) 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
          : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-200 flex items-center justify-center">
            <Hexagon size={24} className="fill-current" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">
            Lumina
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-slate-100 shadow-sm backdrop-blur-md">
          <NavLink to="/" icon={Home}>Home</NavLink>
          <NavLink to="/products" icon={Package}>Products</NavLink>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-slate-100" title="Admin Dashboard">
              <Settings size={20} />
            </Link>
          )}

          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100">
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm shadow-rose-200 animate-fade-in">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white py-1 px-1 pr-4 rounded-full border border-slate-100 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </div>
              <button 
                onClick={logout} 
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-2">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 bg-white rounded-full border border-slate-100 shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl p-4 flex flex-col gap-2 animate-fade-in-up origin-top">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-slate-700 p-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-3 rounded-xl"><Home size={18}/> Home</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-slate-700 p-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-3 rounded-xl"><Package size={18}/> Products</Link>
          <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-slate-700 p-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-3 rounded-xl border-b border-slate-100 pb-4 mb-2">
            <ShoppingCart size={18}/> Cart ({cartItemsCount})
          </Link>
          
          {user ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-indigo-600 p-3 hover:bg-indigo-50 flex items-center gap-3 rounded-xl mb-2"><Settings size={18}/> Admin Dashboard</Link>
              )}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-rose-500 p-2 bg-rose-50 rounded-full"><LogOut size={18}/></button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors py-3 rounded-xl border border-slate-200">Log in</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center font-medium bg-slate-900 text-white hover:bg-indigo-600 transition-colors py-3 rounded-xl shadow-md">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

