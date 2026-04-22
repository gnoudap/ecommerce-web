import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { orderService, paymentService } from '../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, MapPin, Package, User } from 'lucide-react';

// Initialize stripe promise outside to prevent unnecessary re-renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#334155',
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8'
      }
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444'
    }
  }
};

function CheckoutForm() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Create Payment Intent via your backend
      // Provide the amount in cents natively, but let's assume the backend expects the exact amount or handles the conversion
      const totalAmount = getCartTotal();
      const { clientSecret } = await paymentService.createPaymentIntent(totalAmount);

      if (!clientSecret) throw new Error("Failed to initialize payment");

      // 2. Confirm the payment on the client
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zipCode,
            }
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === 'succeeded') {
        // 3. Create Order
        await orderService.createOrder({
          items: cart,
          total: totalAmount,
          shippingInfo: formData,
          paymentInfo: {
            id: paymentResult.paymentIntent.id,
            status: paymentResult.paymentIntent.status
          }
        });
        
        clearCart();
        alert('Order placed successfully!');
        navigate('/');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  // Render wrapper component
  return (
    <div className="max-w-7xl mx-auto my-10 px-5 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-800 tracking-tight">Secure Checkout</h1>
        <p className="text-slate-500 mt-2">Complete your order swiftly and securely</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40">
          
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl flex items-center gap-3">
              <span className="font-semibold block shrink-0">Error:</span> {error}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-5 flex items-center gap-2 text-indigo-900 border-b border-slate-100 pb-3">
              <User className="text-indigo-500" size={24} /> Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" placeholder="john@example.com" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-5 flex items-center gap-2 text-indigo-900 border-b border-slate-100 pb-3">
              <MapPin className="text-indigo-500" size={24} /> Shipping Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Street Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" placeholder="San Francisco" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">ZIP / Postal Code</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" placeholder="94105" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-5 flex items-center gap-2 text-indigo-900 border-b border-slate-100 pb-3">
              <CreditCard className="text-indigo-500" size={24} /> Payment Details
            </h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={!stripe || loading || cart.length === 0}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl text-lg font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              `Pay $${getCartTotal().toFixed(2)}`
            )}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 sticky top-24">
          <h2 className="text-xl font-display font-bold mb-6 text-slate-800 flex items-center gap-2">
            <Package className="text-slate-500" size={22} /> Order Summary
          </h2>
          <div className="space-y-4 mb-6 relative">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800">{item.name}</span>
                  <span className="text-sm text-slate-500">Qty: {item.quantity}</span>
                </div>
                <span className="font-semibold text-slate-700">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-5 border-t border-slate-200">
            <div className="flex justify-between text-slate-600 mb-2">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 mb-4">
              <span>Shipping</span>
              <span className="text-emerald-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-xl font-display font-bold text-slate-900 border-t border-slate-200 pt-4">
              <span>Total</span>
              <span className="text-indigo-600">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
