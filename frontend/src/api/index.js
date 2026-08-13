export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ADMIN_HEADERS = {
  'Content-Type': 'application/json'
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API Request failed');
  }
  return res.json();
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
    throw new Error(`Failed to submit ${type}. Please check your connection or try again later.`);
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
      body: JSON.stringify(data)
    }).then(handleResponse);
    return res;
  },
  deleteMember: async (id) => {
    const res = await fetch(`${API_URL}/members/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
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
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  exportEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  exportFinancialEnquiries: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_URL}/admin/financial-enquiries/export${queryParams ? '?' + queryParams : ''}`;
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
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
    const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    return { data };
  },
  updateServiceStatus: async (id, status) => {
    const data = await fetch(`${API_URL}/services/${id}/status`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ status })
    }).then(handleResponse);

    return { data };
  },
  updateEnquiryStatus: async (id, status) => {
    const data = await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ status })
    }).then(handleResponse);
    return { data };
  },
  deleteEnquiry: async (id) => {
    await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
    }).then(handleResponse);

    return { data: { id } };
  },
  deleteFinancialEnquiry: async (id) => {
    await fetch(`${API_URL}/admin/financial-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
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
    await fetch(`${API_URL}/admin/contact-requests/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
    }).then(handleResponse);

    return { data: { id } };
  },
  login: async (email, password) => {
    const data = await fetch(`${API_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }).then(handleResponse);
    return { data };
  },
  logout: async () => {
    const data = await fetch(`${API_URL}/admin/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(handleResponse);
    return { data };
  },
  changePassword: async (email, oldPassword, newPassword) => {
    const data = await fetch(`${API_URL}/admin/change-password`, {
      method: 'POST',
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ email, oldPassword, newPassword })
    }).then(handleResponse);
    return { data };
  },
  requestOtp: async (email) => {
    const data = await fetch(`${API_URL}/admin/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(handleResponse);
    return { data };
  },
  verifyOtp: async (email, otp) => {
    const data = await fetch(`${API_URL}/admin/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    }).then(handleResponse);
    return { data };
  },
  resetPassword: async (email, otp, newPassword) => {
    const data = await fetch(`${API_URL}/admin/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    }).then(handleResponse);
    return { data };
  }
};
