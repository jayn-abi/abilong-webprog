import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/portfolio`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchPortfolio  = ()         => API.get('/');
// Partial update — only the sections passed in are replaced
export const updatePortfolio = (sections) => API.put('/', sections);
