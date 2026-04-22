import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { productService } from '../services/api';
import { Search } from 'lucide-react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-5 min-h-[80vh] animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-800 tracking-tight">Our Collection</h1>
          <p className="text-slate-500 mt-2">Discover the perfect items for your lifestyle</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-3 pl-12 pr-5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          // Loading Skeletons
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col h-[400px]">
              <div className="h-[60%] bg-slate-200/60 w-full mb-4"></div>
              <div className="px-5 pb-5 flex flex-col flex-grow">
                <div className="h-5 bg-slate-200/80 rounded-md w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-md w-5/6 mb-4 mt-auto"></div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                  <div className="h-6 bg-slate-200/80 rounded-md w-1/4"></div>
                  <div className="h-10 w-10 bg-slate-200/80 rounded-full"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
            <Search size={48} className="text-slate-300 mb-4" />
            <h3 className="text-2xl font-display font-semibold text-slate-700">No products found</h3>
            <p className="mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
