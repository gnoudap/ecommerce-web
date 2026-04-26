import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { productService } from '../services/api';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc') setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-12 px-5 grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">
        <div className="w-full h-[500px] bg-slate-200/60 rounded-3xl"></div>
        <div className="flex flex-col gap-6 pt-5">
          <div className="h-10 bg-slate-200/80 rounded-lg w-3/4"></div>
          <div className="h-8 bg-slate-200/60 rounded-lg w-1/4"></div>
          <div className="space-y-3 mt-4">
            <div className="h-4 bg-slate-100 rounded-md w-full"></div>
            <div className="h-4 bg-slate-100 rounded-md w-full"></div>
            <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
          </div>
          <div className="h-12 bg-slate-200/80 rounded-full w-32 mt-6"></div>
          <div className="h-16 bg-slate-200/80 rounded-full w-full mt-4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p>The item you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/products')} className="mt-6 text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-5 animate-fade-in-up">
      <button onClick={() => navigate(-1)} className="mb-8 text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm font-medium border border-slate-200 bg-white shadow-sm py-2 px-4 rounded-full w-fit">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-3 scale-105 opacity-50 group-hover:rotate-6 transition-transform duration-500"></div>
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'} 
            alt={product.name} 
            className="w-full relative z-10 rounded-3xl shadow-xl shadow-slate-200/50 object-cover min-h-[400px]"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 tracking-tight leading-tight mb-4">{product.name}</h1>
          <p className="text-3xl font-display font-bold text-indigo-600 mb-6">${Number(product.price).toFixed(2)}</p>
          
          <div className="prose prose-slate mb-8">
            <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="border-t border-slate-100 pt-8 mt-auto">
            <div className="flex items-center gap-6 mb-6">
              <span className="font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full p-1">
                <button onClick={() => handleQuantityChange('dec')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm hover:text-indigo-600 transition-all">
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-slate-800">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm hover:text-indigo-600 transition-all">
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-lg font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart size={22} />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
