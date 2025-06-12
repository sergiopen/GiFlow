import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface GetGifsParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface GifUpdateData {
  title?: string;
  tags?: string[];
}

export const getGifs = async ({ page, limit, sort }: GetGifsParams = {}) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', page.toString());
  if (limit !== undefined) params.append('limit', limit.toString());

  const res = await axios.get(`${API_URL}/api/gifs?${params.toString()}${sort ? `&sort=${sort}` : ''}`, { withCredentials: true });
  return res.data;
};

export const getGifById = async (gifId: string) => {
  const res = await axios.get(`${API_URL}/api/gifs/${gifId}`, { withCredentials: true });
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

export const getGifsByTag = async (tag: string, page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/api/gifs?tag=${encodeURIComponent(tag)}&page=${page}&limit=${limit}`);
  return response.data;
};

export const getGifsByName = async (query: string, page = 1, limit = 10) => {
  const res = await axios.get(`${API_URL}/api/gifs/search`, {
    params: { q: query, page, limit },
  });
  return res.data;
};

export const getGifsSuggestions = async (query: string) => {
  const res = await axios.get(`${API_URL}/api/gifs/suggestions?q=${query}`);
  return res.data;
};

export const updateGif = async (id: string, data: GifUpdateData) => {
  const res = await axios.patch(`${API_URL}/api/gifs/${id}`, data, { withCredentials: true });
  return res.data;
};

export const deleteGif = async (id: string) => {
  const res = await axios.delete(`${API_URL}/api/gifs/${id}`, { withCredentials: true });
  return res.data;
};
