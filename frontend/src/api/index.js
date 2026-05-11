// src/api/index.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the API Key for admin routes
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('admin_api_key');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const productApi = {
  getAll: () => api.get('/products'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
};

export const projectApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
};

export const adminApi = {
  getMembers: (params) => api.get('/members', { params }),
  getSchemeStats: () => api.get('/scheme-stats'),
  getEnquiries: (params) => api.get('/enquiries', { params }),
  getFinancialEnquiries: (params) => api.get('/admin/financial-enquiries', { params }),
  getOrders: () => api.get('/orders'),
  exportMembers: (params) => api.get('/members/export', { params }),
  exportEnquiries: (params) => api.get('/enquiries/export', { params }),
  exportFinancialEnquiries: (params) => api.get('/admin/financial-enquiries/export', { params }),
  getServices: (params) => api.get('/services', { params }),
  exportServices: (params) => api.get('/services/export', { params }),
  updateServiceStatus: (id, status) => api.patch(`/services/${id}/status`, { status }),
  updateEnquiryStatus: (id, status) => api.patch(`/api/enquiry/${id}`, { status }),
  updateFinancialEnquiryStatus: (id, status) => api.patch(`/api/admin/financial-enquiries/${id}`, { status }),
  deleteEnquiry: (id) => api.delete(`/api/enquiry/${id}`),
  deleteFinancialEnquiry: (id) => api.delete(`/api/admin/financial-enquiries/${id}`),
};

export default api;
