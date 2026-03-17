import axios, { AxiosInstance } from 'axios';
import { NEWS_API_BASE_URL, NEWS_API_KEY } from '../../config/env';

const client: AxiosInstance = axios.create({
  baseURL: NEWS_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': NEWS_API_KEY,
  },
  params: {
    apiKey: NEWS_API_KEY,
  },
});

export default client;
