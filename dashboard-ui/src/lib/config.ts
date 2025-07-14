// Environment-based configuration
const config = {
  // API URL will default to production URL unless in development
  apiUrl: import.meta.env.VITE_API_URL || 'https://your-backend-name.onrender.com',
  // Add any other configuration variables here
};

export default config; 