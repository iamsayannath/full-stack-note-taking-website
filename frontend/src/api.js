
const BASE = 'https://full-stack-note-taking-website-backend.onrender.com';

const fetchJSON = async (url, opts = {}) => {
  const res = await fetch(`${BASE}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const authAPI = {
  register: (payload) => fetchJSON('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => fetchJSON('/api/auth/login', { method: 'POST', credentials: 'include', body: JSON.stringify(payload) }),
  logout: () => fetchJSON('/api/auth/logout', { method: 'POST' }),
  me: () => fetchJSON('/api/auth/me'),
};

export const notesAPI = {
  list: (q) => fetchJSON(`/api/notes${q ? '?q=' + encodeURIComponent(q) : ''}`),
  get: (id) => fetchJSON(`/api/notes/${id}`),
  create: (payload) => fetchJSON('/api/notes', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => fetchJSON(`/api/notes/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => fetchJSON(`/api/notes/${id}`, { method: 'DELETE' }),
};
