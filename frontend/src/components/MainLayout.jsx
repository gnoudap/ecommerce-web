import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full relative z-0 mt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
