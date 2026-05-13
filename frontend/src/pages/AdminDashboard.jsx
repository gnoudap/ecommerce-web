import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  LayoutDashboard,
  Search,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: ''
  });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const token = userInfo?.token;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      if (activeTab === 'products') {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || data);
      } else if (activeTab === 'orders') {
        const res = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } else if (activeTab === 'users') {
        const res = await fetch(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = userInfo?.token;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const url = editingProduct
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({ name: '', price: '', description: '', category: '', stock: '', image: '' });
      toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const token = userInfo?.token;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete product');

      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      image: product.image
    });
    setShowProductForm(true);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    const token = userInfo?.token;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error('Failed to update order status');

      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message);
    }
  };

  const renderSidebar = () => (
    <div className="w-64 bg-slate-900 text-white min-h-[calc(100vh-4rem)] flex flex-col shadow-2xl z-10 relative">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <LayoutDashboard className="text-indigo-500" size={24} />
          Admin Panel
        </h2>
        <p className="text-slate-400 text-sm mt-2">Welcome back, {userInfo?.name}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Package size={20} /> Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <ShoppingBag size={20} /> Orders
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Users size={20} /> Users
        </button>
      </nav>
    </div>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {renderSidebar()}

      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800">Products Management</h1>
                    <p className="text-slate-500 mt-1">Manage your store inventory</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProductForm(!showProductForm);
                      setEditingProduct(null);
                      setProductForm({ name: '', price: '', description: '', category: '', stock: '', image: '' });
                    }}
                    className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 font-medium"
                  >
                    <Plus size={20} /> {showProductForm ? 'Close Form' : 'Add Product'}
                  </button>
                </div>

                {showProductForm && (
                  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 mb-8 animate-fade-in">
                    <h3 className="text-2xl font-display font-semibold mb-6 text-slate-800">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleProductSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                          <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                          <input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                          <input type="text" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Stock Count</label>
                          <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" rows="3" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                        <input type="text" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-medium transition-all shadow-md shadow-indigo-200 flex-1 md:flex-none">
                          {editingProduct ? 'Update Product' : 'Create Product'}
                        </button>
                        <button type="button" onClick={() => { setShowProductForm(false); setEditingProduct(null); }} className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-300 font-medium transition-all">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">Product</th>
                          <th className="px-6 py-4 font-medium">Price</th>
                          <th className="px-6 py-4 font-medium">Category</th>
                          <th className="px-6 py-4 font-medium">Stock</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Array.isArray(products) && products.map((product) => (
                          <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-200" />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-500"><Package size={20} /></div>
                                )}
                                <span className="font-medium text-slate-800">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-700">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4">
                              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">{product.category}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {product.stock > 0 ? product.stock : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button onClick={() => handleEditProduct(product)} className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-lg transition-all" title="Edit">
                                  <Edit size={18} />
                                </button>
                                <button onClick={() => handleDeleteProduct(product._id)} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition-all" title="Delete">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {(!products || products.length === 0) && (
                          <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No products found. Add one to get started!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-display font-bold text-slate-800">Orders Management</h1>
                  <p className="text-slate-500 mt-1">Review and process customer orders</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">Order ID</th>
                          <th className="px-6 py-4 font-medium">Customer</th>
                          <th className="px-6 py-4 font-medium">Date</th>
                          <th className="px-6 py-4 font-medium">Total</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-slate-500">...{order._id.slice(-6)}</td>
                            <td className="px-6 py-4 font-medium text-slate-800">{order.user?.name || 'Guest'}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-medium text-slate-800">${order.totalPrice?.toFixed(2) || '0.00'}</td>
                            <td className="px-6 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                className={`text-sm font-medium px-3 py-1 rounded-full outline-none border-2 transition-all ${
                                  order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  order.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                  'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => navigate(`/orders/${order._id}`)} className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-lg transition-all font-medium text-sm flex items-center justify-end gap-1 ml-auto">
                                <Eye size={16} /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                        {orders.length === 0 && (
                          <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-slate-500">No orders placed yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-display font-bold text-slate-800">Users Management</h1>
                  <p className="text-slate-500 mt-1">View and manage customer accounts</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">Email</th>
                          <th className="px-6 py-4 font-medium">Role</th>
                          <th className="px-6 py-4 font-medium">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-800">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                                  {user.name.charAt(0)}
                                </div>
                                {user.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}>
                                {user.role === 'admin' ? 'Admin' : 'Customer'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
