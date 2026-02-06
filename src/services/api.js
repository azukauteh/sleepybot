import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.url}`, error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - backend may be slow or down');
    }
    
    if (error.message === 'Network Error') {
      throw new Error('Cannot reach backend at http://localhost:8000. Make sure it is running.');
    }
    
    if (error.response) {
      throw new Error(`Backend error: ${error.response.status} - ${error.response.data?.detail || error.message}`);
    }
    
    throw new Error(error.message || 'Unknown API error');
  }
);

export const getBotStatus = async () => {
  try {
    const { data } = await api.get('/status');
    return data;
  } catch (error) {
    console.error('getBotStatus failed:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const { data } = await api.get('/stats');
    return data;
  } catch (error) {
    console.error('getStats failed:', error);
    throw error;
  }
};

export const getVolatilityData = async () => {
  try {
    const { data } = await api.get('/volatility');
    return data;
  } catch (error) {
    console.error('getVolatilityData failed:', error);
    throw error;
  }
};

export const startBot = async () => {
  try {
    const { data } = await api.post('/start');
    return data;
  } catch (error) {
    console.error('startBot failed:', error);
    throw error;
  }
};

export const stopBot = async () => {
  try {
    const { data } = await api.post('/stop');
    return data;
  } catch (error) {
    console.error('stopBot failed:', error);
    throw error;
  }
};

export default api;
