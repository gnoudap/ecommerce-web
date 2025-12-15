import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4 text-purple-400">About Us</h3>
          <p className="text-gray-400 leading-relaxed">Your trusted e-commerce store for quality products.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-purple-400">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
            <li><a href="/products" className="text-gray-400 hover:text-purple-400 transition-colors">Products</a></li>
            <li><a href="/cart" className="text-gray-400 hover:text-purple-400 transition-colors">Cart</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-purple-400">Contact</h3>
          <p className="text-gray-400">Email: support@eshop.com</p>
          <p className="text-gray-400">Phone: (555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-purple-400">Follow Us</h3>
          <p className="text-gray-400">Facebook | Twitter | Instagram</p>
        </div>
      </div>
      <div className="text-center py-5 border-t border-gray-700 text-gray-500">
        <p>&copy; 2025 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

