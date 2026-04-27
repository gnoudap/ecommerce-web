import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Product Service
export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/api/products');
    return response.data;
  },

  getProductById: async (_id) => {
    const response = await api.get(`/api/products/${_id}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/api/products/search?query=${query}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/api/products/category/${category}`);
    return response.data;
  }
};

// User Service
export const userService = {
  login: async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },

  getUserProfile: async (_id) => {
    const response = await api.get(`/api/users/${_id}`);
    return response.data;
  },

  updateUser: async (_id, userData) => {
    const response = await api.put(`/api/users/${_id}`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }
};

// Order Service
export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/api/orders/myorders');
    return response.data;
  },

  getOrderById: async (_id) => {
    const response = await api.get(`/api/orders/${_id}`);
    return response.data;
  }
};

// Payment Service
export const paymentService = {
  createPaymentIntent: async (amount) => {
    const response = await api.post('/api/payment/create-payment-intent', { amount });
    return response.data;
  }
};

export default api;
