import React, { useState, useEffect } from 'react';
import { getBotStatus, getStats, getVolatilityData } from '../services/api';
import BotStatus from '../components/dashboard/BotStatus';
import StatsCards from '../components/dashboard/StatsCards';
import QuickActions from '../components/dashboard/QuickActions';
import VolatilityChart from '../components/analytics/VolatilityChart';
import SleepSchedule from '../components/analytics/SleepSchedule';

const Dashboard = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [stats, setStats] = useState(null);
  const [volatilityData, setVolatilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('📊 Dashboard: Mounting...');
    
    const fetchData = async () => {
      try {
        console.log('📡 Fetching bot status...');
        const statusData = await getBotStatus();
        console.log('✅ Got status:', statusData);
        setBotStatus(statusData);

        console.log('📡 Fetching stats...');
        const statsData = await getStats();
        console.log('✅ Got stats:', statsData);
        setStats(statsData);

        console.log('📡 Fetching volatility data...');
        const volatilityResponse = await getVolatilityData();
        console.log('✅ Got volatility:', volatilityResponse);
        setVolatilityData(volatilityResponse?.data || volatilityResponse || []);

        setError(null);
      } catch (err) {
        console.error('❌ Dashboard error:', err);
        setError(err.message || 'Failed to fetch data');
        setBotStatus({ isConnected: false });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && !botStatus) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <BotStatus status={botStatus} />
        </div>
        <div className="lg:w-80">
          <QuickActions />
        </div>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VolatilityChart data={volatilityData} threshold={botStatus?.threshold} />
        </div>
        <div>
          <SleepSchedule />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
