import { useState, useEffect, useCallback } from 'react';
import { getTrades } from '../services/api';
import { POLLING_INTERVALS } from '../utils/constants';

export const useTradeData = (initialFilters = {}) => {
  const [trades, setTrades] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 20,
    ...initialFilters,
  });

  const fetchTrades = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTrades(filters);
      setTrades(data.trades);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch trades:', err);
      setError('Failed to load trades');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, POLLING_INTERVALS.TRADES);
    return () => clearInterval(interval);
  }, [fetchTrades]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: newFilters.page || 1 }));
  };

  return {
    trades,
    total,
    loading,
    error,
    filters,
    updateFilters,
    refreshTrades: fetchTrades,
  };
};
