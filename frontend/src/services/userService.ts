import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const getUserByUsername = async (username: string) => {
  const res = await axios.get(`${API_URL}/api/users/${username}`);
  return res.data;
};
