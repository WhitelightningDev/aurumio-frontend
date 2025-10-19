// Simple API client for AurumIO frontend
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/v1';

export function getToken() {
  try { return localStorage.getItem('aurumio.token') || ''; } catch { return ''; }
}

export function setToken(token) {
  try { localStorage.setItem('aurumio.token', token); } catch {}
}

export function clearToken() {
  try { localStorage.removeItem('aurumio.token'); } catch {}
}

function headers(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra };
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

function makeIdemKey() {
  return 'idem-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function request(path, { method = 'GET', body, idempotent = false, headers: extraHeaders = {} } = {}) {
  const opts = { method, headers: headers(extraHeaders) };
  if (body !== undefined) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  if (idempotent && (method === 'POST' || method === 'PATCH')) {
    opts.headers['Idempotency-Key'] = makeIdemKey();
  }
  const res = await fetch(`${API_BASE}${path}`, opts);
  const ct = res.headers.get('content-type') || '';
  const isJson = ct.includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (data && data.message) || res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    if (res.status === 401) {
      try { clearToken(); } catch {}
      if (typeof window !== 'undefined') {
        const next = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.assign(`/login?next=${next}`);
      }
    } else if (res.status === 403) {
      if (typeof window !== 'undefined') {
        window.location.assign('/');
      }
    }
    throw err;
  }
  return data;
}

export const api = {
  get: (p) => request(p, { method: 'GET' }),
  post: (p, b, idem = true) => request(p, { method: 'POST', body: b, idempotent: idem }),
  patch: (p, b, idem = true) => request(p, { method: 'PATCH', body: b, idempotent: idem }),
};

export const authApi = {
  async login(email, password) {
    const r = await api.post('/auth/login', { email, password }, false);
    setToken(r.access_token);
    return r;
  },
  async register({ account_name, cell_number, email, password }) {
    return api.post('/auth/register', { account_name, cell_number, email, password });
  },
  async me() {
    return api.get('/auth/me');
  },
};

export const marketApi = {
  products: () => api.get('/market/products'),
  prices: () => api.get('/market/prices'),
  activeOrders: () => api.get('/market/active-orders'),
};

export const offersApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/offers/${qs ? '?' + qs : ''}`);
  },
  create: ({ side, product_id, qty_total, price_per_unit_gross }) =>
    api.post('/offers/', { side, product_id, qty_total: String(qty_total), price_per_unit_gross: String(price_per_unit_gross) }),
  get: (id) => api.get(`/offers/${id}`),
  cancel: (id) => api.post(`/offers/${id}/cancel`, {}),
};

export const txApi = {
  pending: () => api.get('/transactions/pending'),
  detail: (id) => api.get(`/transactions/${id}`),
  pay: (id, { amount, reference, proof_file_id }) => api.post(`/transactions/${id}/pay`, { amount, reference, proof_file_id }),
  ship: (id, { method, tracking_number, waybill_file_id }) => api.post(`/transactions/${id}/ship`, { method, tracking_number, waybill_file_id }),
  delivered: (id) => api.post(`/transactions/${id}/delivered`, {}),
  receipt: (id) => api.get(`/transactions/receipts/${id}`),
  adminList: (params={}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/admin/transactions${qs?('?'+qs):''}`);
  },
  adminDetail: (id) => api.get(`/admin/transactions/${id}`),
  adminRelease: (id, amount, reference) => api.post(`/admin/transactions/${id}/release?amount=${encodeURIComponent(amount)}&reference=${encodeURIComponent(reference)}`, {}),
};

export const adminApi = {
  products: () => api.get('/admin/products'),
  addProduct: (p) => api.post('/admin/products', p),
  updateProduct: (id, p) => api.patch(`/admin/products/${id}`, p),
  fees: () => api.get('/admin/fees'),
  addFee: (f) => api.post('/admin/fees', f),
  updateFee: (id, f) => api.patch(`/admin/fees/${id}`, f),
  offers: () => api.get('/admin/offers'),
  bankAccounts: () => api.get('/admin/bank-accounts'),
  addBankAccount: (b) => api.post('/admin/bank-accounts', b),
  updateBankAccount: (id, b) => api.patch(`/admin/bank-accounts/${id}`, b),
  notificationTemplates: () => api.get('/admin/notifications/templates'),
  addNotificationTemplate: (t) => api.post('/admin/notifications/templates', t),
};

export async function uploadFile(file) {
  const form = new FormData();
  form.append('f', file);
  const token = getToken();
  const res = await fetch(`${API_BASE}/files/upload`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    body: form,
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data?.message || res.statusText);
    err.status = res.status; err.data = data; throw err;
  }
  return data; // { file_id, url }
}
