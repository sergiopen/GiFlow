import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const getGifs = async () => {
  const res = await axios.get(`${API_URL}/api/gifs`);
  return res.data;
};

export const uploadGif = async (formData: FormData) => {
  const res = await axios.post(`${API_URL}/api/gifs`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return res.data;
};

export const likeGif = async (gifId: string) => {
  const res = await axios.post(
    `${API_URL}/api/gifs/${gifId}/like`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const incrementView = async (gifId: string) => {
  const res = await axios.patch(`${API_URL}/api/gifs/${gifId}/view`, {}, { withCredentials: true });
  return res.data;
};
