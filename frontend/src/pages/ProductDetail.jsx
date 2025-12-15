import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { productService } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
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

  if (loading) return <div className="text-center py-24 text-2xl">Loading...</div>;
  if (!product) return <div className="text-center py-24 text-2xl text-red-600">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto my-10 px-5 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <img 
          src={product.image || 'https://via.placeholder.com/400'} 
          alt={product.name} 
          className="w-full rounded-2xl shadow-2xl"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-3xl font-bold text-purple-600">${product.price}</p>
        <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
        <div className="flex items-center gap-4">
          <label className="font-semibold text-lg">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 py-2 px-3 border-2 border-gray-300 rounded-lg text-base"
          />
        </div>
        <button 
          onClick={handleAddToCart}
          className="mt-5 py-4 px-10 bg-purple-600 text-white rounded-full text-lg font-bold hover:bg-purple-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
