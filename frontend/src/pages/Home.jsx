import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-24 px-5 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 animate-fade-in-up">
            Welcome to Our E-Commerce Store
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-block py-4 px-10 bg-white text-purple-600 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              Shop Now
            </Link>
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="inline-block py-4 px-10 bg-yellow-400 text-gray-900 rounded-full font-bold hover:scale-105 transition-transform duration-300"
              >
                ⚙️ Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-5 max-w-6xl mx-auto">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:-translate-y-3 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-3 text-purple-600">🚚 Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:-translate-y-3 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-3 text-purple-600">🔒 Secure Payment</h3>
          <p className="text-gray-600">100% secure transactions</p>
        </div>
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:-translate-y-3 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-3 text-purple-600">↩️ Easy Returns</h3>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:-translate-y-3 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-3 text-purple-600">⭐ Quality Products</h3>
          <p className="text-gray-600">Top-rated items</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
