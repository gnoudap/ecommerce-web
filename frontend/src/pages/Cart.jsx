import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl text-gray-600 mb-8">Your cart is empty</h2>
        <Link 
          to="/products" 
          className="inline-block py-4 px-10 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-5">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      <div className="flex flex-col gap-5 mb-10">
        {cart.map(item => (
          <div key={item._id} className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center p-5 bg-white rounded-xl shadow-md">
            <img 
              src={item.image || 'https://via.placeholder.com/100'} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-lg text-purple-600 font-semibold">${item.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-9 h-9 border-2 border-purple-600 bg-white text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="text-xl font-semibold min-w-8 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-9 h-9 border-2 border-purple-600 bg-white text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
            <div className="text-xl font-bold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              onClick={() => removeFromCart(item._id)}
              className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-8 rounded-xl text-right">
        <h2 className="text-3xl font-bold text-gray-800 mb-5">Total: ${getCartTotal().toFixed(2)}</h2>
        <Link 
          to="/checkout" 
          className="inline-block py-4 px-12 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl transition-all"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
