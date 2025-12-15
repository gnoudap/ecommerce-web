import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-18">
        <Link to="/" className="text-3xl font-bold text-purple-600 hover:text-purple-800 transition-colors">
          🛍️ E-Shop
        </Link>
        
        <ul className="flex gap-8 items-center">
          <li>
            <Link to="/" className="text-gray-800 font-medium hover:text-purple-600 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-gray-800 font-medium hover:text-purple-600 transition-colors">Products</Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link to="/admin" className="text-gray-800 font-medium hover:text-purple-600 transition-colors flex items-center gap-1">
                <span>⚙️</span> Admin
              </Link>
            </li>
          )}
          <li className="relative">
            <Link to="/cart" className="text-gray-800 font-medium hover:text-purple-600 transition-colors">
              🛒 Cart {cartItemsCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{cartItemsCount}</span>}
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <span className="text-gray-800 font-medium">Hi, {user.name}</span>
              </li>
              <li>
                <button onClick={logout} className="py-2 px-5 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-800 font-medium hover:text-purple-600 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-800 font-medium hover:text-purple-600 transition-colors">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

