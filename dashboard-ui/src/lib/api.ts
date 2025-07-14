import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import config from './config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for any auth headers if needed
api.interceptors.request.use((config: AxiosRequestConfig) => {
  // Add any auth headers here if needed
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle any API errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 