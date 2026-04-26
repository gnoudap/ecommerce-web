import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full -mt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500"></div>
        <div className="max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-400/20 text-indigo-300 px-4 py-2 rounded-[30px] mb-6 backdrop-blur-sm border border-violet-400/30">
            <MessageSquare size={16} />
            <span className="text-sm font-medium tracking-wider uppercase">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            We'd Love to Hear <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">From You</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      <section className="py-24 px-5 bg-slate-50 relative -mt-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: MapPin, title: 'Visit Us', info: 'Hai Chau District, Da Nang', subInfo: 'Vietnam', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { icon: Phone, title: 'Call Us', info: '+84 123 456 789', subInfo: 'Mon-Fri from 8am to 5pm', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: Mail, title: 'Email Us', info: 'support@duongpham.com', subInfo: 'We reply within 24 hours', color: 'text-pink-600', bg: 'bg-pink-50' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex items-start gap-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-slate-700 font-medium">{item.info}</p>
                    <p className="text-slate-500 text-sm mt-1">{item.subInfo}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 font-display">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 text-slate-900 px-5 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 text-slate-900 px-5 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 text-slate-900 px-5 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-white border border-slate-200 text-slate-900 px-5 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
