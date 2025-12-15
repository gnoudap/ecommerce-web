import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { orderService } from '../services/api';

function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.createOrder({
        items: cart,
        total: getCartTotal(),
        shippingInfo: formData
      });
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-5">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-5 text-purple-600">Shipping Information</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          
          <h2 className="text-2xl font-bold mb-5 text-purple-600">Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-600"
          />
          
          <button 
            type="submit" 
            className="w-full py-5 bg-green-600 text-white rounded-full text-xl font-bold hover:bg-green-700 hover:-translate-y-1 hover:shadow-xl transition-all mt-5"
          >
            Place Order - ${getCartTotal().toFixed(2)}
          </button>
        </form>

        <div className="bg-gray-100 p-8 rounded-xl h-fit sticky top-5">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Order Summary</h2>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between py-3 border-b border-gray-300">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-5 text-2xl font-bold text-gray-800 mt-3">
            <strong>Total:</strong>
            <strong>${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
