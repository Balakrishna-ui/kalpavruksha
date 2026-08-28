export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAdminHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {}
  return headers;
};

const ADMIN_HEADERS = new Proxy({ 'Content-Type': 'application/json' }, {
  get(target, prop) {
    const dynamic = getAdminHeaders();
    return dynamic[prop] || target[prop];
  },
  ownKeys() {
    return Object.keys(getAdminHeaders());
  },
  getOwnPropertyDescriptor(target, prop) {
    const dynamic = getAdminHeaders();
    if (prop in dynamic) {
      return { value: dynamic[prop], writable: true, enumerable: true, configurable: true };
    }
    return undefined;
  }
});

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || error.message || 'API Request failed');
  }
  return res.json();
};

const handleExportResponse = async (res) => {
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('Your admin session has expired. Please login again.');
    }
    throw new Error('Unable to generate the report. Please try again.');
  }
  return res.blob();
};

const safeSubmit = async (endpoint, data, type) => {
  try {
    const isFormData = data instanceof FormData;
    const headers = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: isFormData ? data : JSON.stringify(data)
    });
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error(`Submission failed for ${type}.`, error);
    throw new Error(error.message || `Failed to submit ${type}. Please check your connection or try again later.`);
  }
};

export const publicApi = {
  submitMembership: async (data) => {
    return safeSubmit('/membership', data, 'Membership');
  },
  submitFinancialEnquiry: async (data) => {
    return safeSubmit('/financial-enquiry', data, 'Financial Enquiry');
  },
  submitServiceEnquiry: async (data) => {
    return safeSubmit('/service-request', data, 'Service Enquiry');
  },
  submitLead: async (data) => {
    return safeSubmit('/enquiry', data, 'Lead');
  },
  submitContact: async (data) => {
    return safeSubmit('/contact', data, 'Contact');
  },
  submitEducationEnquiry: async (data) => {
    return safeSubmit('/education-enquiry', data, 'Education Enquiry');
  },
  submitBusinessConsultancyEnquiry: async (data) => {
    return safeSubmit('/business-consultancy', data, 'Business Consultancy Enquiry');
  },
  submitCooperativeTradingEnquiry: async (data) => {
    return safeSubmit('/cooperative-trading', data, 'Cooperative Trading Enquiry');
  }
};

export const productApi = {
  getAll: async (category) => {
    const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
    const data = await fetch(url).then(handleResponse);
    return { data };
  },
  getBySlug: async (slug) => {
    const data = await fetch(`${API_URL}/products/${slug}`).then(handleResponse);
    return { data };
  }
};

export const projectApi = {
  getAll: async () => {
    const data = await fetch(`${API_URL}/projects`).then(handleResponse);
    return { data };
  },
  getById: async (id) => {
    // Note: Backend uses slug mostly, but we can map this if needed
    const data = await fetch(`${API_URL}/projects/${id}`).then(handleResponse);
    return { data };
  },
  getBySlug: async (slug) => {
    const data = await fetch(`${API_URL}/projects/${slug}`).then(handleResponse);
    return { data };
  }
};

export const adminApi = {
  getMembers: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/members${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  put: async (url, data) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: ADMIN_HEADERS,
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(handleResponse);
    return res;
  },
  deleteMember: async (id) => {
    const res = await fetch(`${API_URL}/members/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    }).then(handleResponse);
    return res;
  },
  getSchemeStats: async () => {
    const data = await fetch(`${API_URL}/scheme-stats`, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  getEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/enquiries${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  getFinancialEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/financial-enquiries${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  getOrders: async () => {
    try {
      const data = await fetch(`${API_URL}/orders`, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
      return { data };
    } catch (e) {
      return { data: [] };
    }
  },
  exportMembers: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/members/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  exportEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  exportFinancialEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/financial-enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  getServices: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/services${queryParams ? '?' + queryParams : ''}`;
      const data = await fetch(url).then(handleResponse);
      return { data };
    } catch (e) {
      return { data: [] };
    }
  },
  exportServices: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/services/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  updateServiceStatus: async (id, status) => {
    const data = await fetch(`${API_URL}/services/${id}/status`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      credentials: 'include',
      body: JSON.stringify({ status })
    }).then(handleResponse);

    return { data };
  },
  updateEnquiryStatus: async (id, status) => {
    const data = await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      credentials: 'include',
      body: JSON.stringify({ status })
    }).then(handleResponse);
    return { data };
  },
  deleteEnquiry: async (id) => {
    await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    }).then(handleResponse);

    return { data: { id } };
  },
  deleteFinancialEnquiry: async (id) => {
    await fetch(`${API_URL}/admin/financial-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    }).then(handleResponse);

    return { data: { id } };
  },
  getContactRequests: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/contact-requests${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  deleteContactRequest: async (id) => {
    const response = await fetch(`${API_URL}/admin/contact-requests/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to delete message');
    }

    return { data: { id } };
  },
  getEducationEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/education-enquiries${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  deleteEducationEnquiry: async (id) => {
    const response = await fetch(`${API_URL}/admin/education-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to delete education enquiry');
    }

    return { data: { id } };
  },
  getBusinessConsultancyEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/business-consultancy-enquiries${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  exportBusinessConsultancyEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/business-consultancy-enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  deleteBusinessConsultancyEnquiry: async (id) => {
    const response = await fetch(`${API_URL}/admin/business-consultancy-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.message || 'Failed to delete business consultancy enquiry');
    }

    return { data: { id } };
  },
  getCooperativeTradingEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/cooperative-trading-enquiries${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  exportCooperativeTradingEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/cooperative-trading-enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const blob = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleExportResponse);
    return blob;
  },
  deleteCooperativeTradingEnquiry: async (id) => {
    const response = await fetch(`${API_URL}/admin/cooperative-trading-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS,
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || error.message || 'Failed to delete cooperative trading enquiry');
    }

    return { data: { id } };
  },
  login: async (email, password) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

    try {
      const data = await fetch(`${API_URL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      }).then(handleResponse);

      if (data?.token) {
        try { localStorage.setItem('admin_token', data.token); } catch (e) {}
      }

      return { data };
    } catch (error) {
      if (error.name === 'AbortError' || error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the authentication server. Please try again.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },
  logout: async () => {
    try { localStorage.removeItem('admin_token'); } catch (e) {}
    const data = await fetch(`${API_URL}/admin/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(handleResponse);
    return { data };
  },
  changePassword: async (email, oldPassword, newPassword) => {
    const data = await fetch(`${API_URL}/admin/auth/change-password`, {
      method: 'POST',
      headers: ADMIN_HEADERS,
      credentials: 'include',
      body: JSON.stringify({ email, oldPassword, newPassword })
    }).then(handleResponse);
    return { data };
  },
  requestOtp: async (email) => {
    const data = await fetch(`${API_URL}/admin/auth/forgot-password/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(handleResponse);
    return { data };
  },
  verifyOtp: async (email, otp) => {
    const data = await fetch(`${API_URL}/admin/auth/forgot-password/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    }).then(handleResponse);
    return { data };
  },
  resetPassword: async (email, otp, newPassword) => {
    const data = await fetch(`${API_URL}/admin/auth/forgot-password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    }).then(handleResponse);
    return { data };
  }
};
