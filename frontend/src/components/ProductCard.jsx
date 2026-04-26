import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingCart, Eye } from 'lucide-react';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-200/40 transition-all duration-300 flex flex-col relative w-full h-[400px]">
      <Link to={`/products/${product._id}`} className="relative h-[60%] overflow-hidden bg-slate-50 flex items-center justify-center">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
           <div className="bg-white/90 backdrop-blur text-indigo-600 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             <Eye size={20} />
           </div>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow bg-white relative z-10">
        <Link to={`/products/${product._id}`} className="no-underline">
          <h3 className="text-lg font-display font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
          <span className="text-xl font-bold font-display text-slate-900">${Number(product.price).toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-200 transition-all duration-300 transform active:scale-95 group/btn"
            title="Add to Cart"
          >
            <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

