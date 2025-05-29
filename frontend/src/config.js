const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: 'https://your-domain.com/api' // Replace with your actual domain
  }
};

export default config[process.env.NODE_ENV || 'development']; 