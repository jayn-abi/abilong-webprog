import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/media`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchMedia     = ()           => API.get('/');
export const fetchSignature = (slot)       => API.post('/signature', { slot });
export const saveMedia      = (slot, data) => API.put(`/${slot}`, data);
export const deleteMedia    = (slot)       => API.delete(`/${slot}`);

/*
 * Signed direct upload: the server signs the request (the API secret never
 * reaches the browser), then the file goes straight to Cloudinary.
 */
export const uploadToCloudinary = async (slot, file, onProgress) => {
  const { data: sig } = await fetchSignature(slot);

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', sig.timestamp);
  form.append('signature', sig.signature);
  Object.entries(sig.params).forEach(([key, value]) => form.append(key, value));

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    form,
    {
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
      },
    },
  );
  return data;
};

/*
 * Adds delivery transformations (auto format/quality, width cap) to a
 * Cloudinary URL. Non-Cloudinary URLs are returned unchanged.
 */
export const cloudinaryUrl = (url, width = 1600) => {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`);
};
