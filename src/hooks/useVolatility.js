import { useState, useEffect, useCallback } from 'react';
import { getVolatilityData } from '../services/api';
import { POLLING_INTERVALS } from '../utils/constants';

export const useVolatility = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await getVolatilityData();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch volatility data:', err);
      setError('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVALS.TRADES); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refreshData: fetchData,
  };
};
