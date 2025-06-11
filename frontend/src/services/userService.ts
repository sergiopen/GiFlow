import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

type FormData = {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
};

export const getUserByUsername = async (username: string) => {
  const res = await axios.get(`${API_URL}/api/users/${username}`);
  return res.data;
};

export const updateUserProfile = async (userId: string, formData: FormData) => {
  const res = await axios.patch(`${API_URL}/api/users/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return res.data;
};
