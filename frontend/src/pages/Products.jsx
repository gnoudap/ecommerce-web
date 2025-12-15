import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { productService } from '../services/api';

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

  if (loading) {
    return <div className="text-center py-24 text-2xl text-purple-600">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-10 gap-5 flex-wrap">
        <h1 className="text-gray-800 text-4xl font-bold">Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="py-3 px-5 border-2 border-gray-300 rounded-full text-base w-80 focus:outline-none focus:border-purple-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;
