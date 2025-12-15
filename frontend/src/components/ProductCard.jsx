import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 flex flex-col">
      <Link to={`/products/${product._id}`}>
        <img 
          src={product.image || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/products/${product._id}`} className="no-underline">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-purple-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{product.description?.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-purple-600">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="py-2 px-5 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 hover:scale-105 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

