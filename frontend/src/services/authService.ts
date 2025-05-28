import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const registerUser = async (formData: { username: string; email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/api/auth/register`, formData, { withCredentials: true });
  return res.data;
};

export const loginUser = async (identifier: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, { identifier, password }, { withCredentials: true });
  return res.data;
};

export const verifyUser = async () => {
  const res = await axios.get(`${API_URL}/api/auth/verify`, { withCredentials: true });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
  return res.data;
};
