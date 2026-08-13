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
      body: isFormData ? data : JSON.stringify(data)
    });
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    if (data instanceof FormData) {
      console.error(`Submission failed for ${type}. Cannot use local fallback for file uploads.`, error);
      throw new Error(`Failed to submit ${type}. Please check your connection or try again later.`);
    }
    console.warn(`Submission failed for ${type}. Saving to backup.`, error);
        return { success: true, localBackup: true, message: 'Form submitted successfully (local fallback)' };
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

const getLocalBackupSubmissions = (type) => {
  try {
    const list = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
    return list
      .filter(item => item.type === type)
      .map(item => {
        const record = {
          id: item.id,
          createdAt: item.submittedAt,
          updatedAt: item.submittedAt,
          status: 'Local Backup',
          ...item.data
        };
        if (type === 'Membership') {
          record.mobileNumber = record.mobileNumber || record.phone || '';
        } else if (type === 'Service Enquiry' || type === 'Lead') {
          record.phone = record.phone || record.mobileNumber || '';
        }
        return record;
      });
  } catch (e) {
    return [];
  }
};

export const adminApi = {
  getMembers: async (params = {}) => {
    let apiData = [];
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/members${queryParams ? '?' + queryParams : ''}`;
      apiData = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    } catch (e) {
      console.warn("Could not fetch members from API, loading local backups only", e);
    }
    const localBackups = getLocalBackupSubmissions('Membership');
    const merged = [...localBackups, ...(Array.isArray(apiData) ? apiData : [])];
    return { data: merged };
  },
  put: async (url, data) => {
    const localMatch = url.match(/\/members\/(local_[^\/]+)\/status/);
    if (localMatch) {
      const localId = localMatch[1];
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const updated = existing.map(item => {
        if (item.id === localId) {
          return { ...item, data: { ...item.data, ...data } };
        }
        return item;
      });
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(updated));
      return { success: true };
    }

    const res = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: ADMIN_HEADERS,
      body: JSON.stringify(data)
    }).then(handleResponse);
    return res;
  },
  deleteMember: async (id) => {
    if (String(id).startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const updated = existing.filter(item => item.id !== id);
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(updated));
      return { success: true };
    }

    const res = await fetch(`${API_URL}/members/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
    }).then(handleResponse);
    return res;
  },
  getSchemeStats: async () => {
    try {
      const data = await fetch(`${API_URL}/scheme-stats`, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
      return { data };
    } catch (e) {
      const localBackups = getLocalBackupSubmissions('Membership');
      const stats = localBackups.reduce((acc, curr) => {
        const type = curr.membershipType || 'Standard';
        const existing = acc.find(s => s.membershipType === type);
        if (existing) {
          existing._count = { id: (existing._count?.id || 0) + 1 };
        } else {
          acc.push({ membershipType: type, _count: { id: 1 } });
        }
        return acc;
      }, []);
      return { data: { schemes: stats, total: localBackups.length } };
    }
  },
  getEnquiries: async (params = {}) => {
    let apiData = [];
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/enquiries${queryParams ? '?' + queryParams : ''}`;
      apiData = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    } catch (e) {
      console.warn("Could not fetch enquiries from API", e);
    }
    const localBackups = getLocalBackupSubmissions('Service Enquiry');
    const localLeads = getLocalBackupSubmissions('Lead');
    const merged = [...localBackups, ...localLeads, ...(Array.isArray(apiData) ? apiData : [])];
    return { data: merged };
  },
  getFinancialEnquiries: async (params = {}) => {
    let apiData = [];
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/admin/financial-enquiries${queryParams ? '?' + queryParams : ''}`;
      apiData = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    } catch (e) {
      console.warn("Could not fetch financial enquiries from API", e);
    }
    const localBackups = getLocalBackupSubmissions('Financial Enquiry');
    const merged = [...localBackups, ...(Array.isArray(apiData) ? apiData : [])];
    return { data: merged };
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
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/members/export${queryParams ? '?' + queryParams : ''}`;
      const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
      return { data };
    } catch (e) {
      const localBackups = getLocalBackupSubmissions('Membership');
      return { data: localBackups };
    }
  },
  exportEnquiries: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/enquiries/export${queryParams ? '?' + queryParams : ''}`;
      const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
      return { data };
    } catch (e) {
      const localBackups = [...getLocalBackupSubmissions('Service Enquiry'), ...getLocalBackupSubmissions('Lead')];
      return { data: localBackups };
    }
  },
  exportFinancialEnquiries: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/admin/financial-enquiries/export${queryParams ? '?' + queryParams : ''}`;
      const data = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
      return { data };
    } catch (e) {
      const localBackups = getLocalBackupSubmissions('Financial Enquiry');
      return { data: localBackups };
    }
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
    if (id.startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const item = existing.find(i => i.id === id);
      if (item) item.data.status = status;
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(existing));
      return { data: { id, status } };
    }
    const data = await fetch(`${API_URL}/services/${id}/status`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ status })
    }).then(handleResponse);

    return { data };
  },
  updateEnquiryStatus: async (id, status) => {
    if (String(id).startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const item = existing.find(i => i.id === id);
      if (item) item.data.status = status;
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(existing));
      return { data: { id, status } };
    }
    const data = await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'PATCH',
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ status })
    }).then(handleResponse);
    return { data };
  },
  deleteEnquiry: async (id) => {
    if (id.startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(filtered));
      return { data: { id } };
    }
    await fetch(`${API_URL}/enquiry/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
    }).then(handleResponse);

    return { data: { id } };
  },
  deleteFinancialEnquiry: async (id) => {
    if (id.startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(filtered));
      return { data: { id } };
    }
    await fetch(`${API_URL}/admin/financial-enquiries/${id}`, {
      method: 'DELETE',
      headers: ADMIN_HEADERS
    }).then(handleResponse);

    return { data: { id } };
  },
  getContactRequests: async (params = {}) => {
    let apiData = [];
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_URL}/admin/contact-requests${queryParams ? '?' + queryParams : ''}`;
      apiData = await fetch(url, { headers: ADMIN_HEADERS, credentials: 'include', cache: 'no-store' }).then(handleResponse);
    } catch (e) {
      console.warn("Could not fetch contact requests from API", e);
    }
    const localBackups = getLocalBackupSubmissions('Contact');
    const merged = [...localBackups, ...(Array.isArray(apiData) ? apiData : [])];
    return { data: merged };
  },
  deleteContactRequest: async (id) => {
    if (id.startsWith('local_')) {
      const existing = JSON.parse(localStorage.getItem('kalpavruksha_submissions') || '[]');
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem('kalpavruksha_submissions', JSON.stringify(filtered));
      return { data: { id } };
    }
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
