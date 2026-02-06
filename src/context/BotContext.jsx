import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getBotStatus, getStats } from '../services/api';
import { POLLING_INTERVALS } from '../utils/constants';

const BotContext = createContext();

export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBot must be used within a BotProvider');
  }
  return context;
};

export const BotProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await getBotStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch bot status:', err);
      setError(err.message || 'Connection error');
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch bot stats:', err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStatus(), fetchStats()]);
      setLoading(false);
    };

    init();

    const statusInterval = setInterval(fetchStatus, POLLING_INTERVALS.STATUS);
    const statsInterval = setInterval(fetchStats, POLLING_INTERVALS.STATS);

    return () => {
      clearInterval(statusInterval);
      clearInterval(statsInterval);
    };
  }, [fetchStatus, fetchStats]);

  const value = {
    status,
    stats,
    loading,
    error,
    refreshStatus: fetchStatus,
    refreshStats: fetchStats,
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};
