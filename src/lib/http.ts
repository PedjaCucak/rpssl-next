import axios from 'axios';

// NOTE: This client is meant for the BROWSER (client components / thunks).
export const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Normalize error messages
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ??
      err?.response?.data?.message ??
      err?.message ??
      'Request failed';
    return Promise.reject(new Error(msg));
  }
);
