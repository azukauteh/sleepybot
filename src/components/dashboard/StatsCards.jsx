import React from 'react';
import { TrendingUp, TrendingDown, Award, DollarSign, Activity, BarChart2 } from 'lucide-react';
import { useBot } from '../../context/BotContext';
import Card from '../ui/Card';
import { formatCurrency, formatPercent, formatVolatility } from '../../utils/formatters';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => (
  <Card className="p-5">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${colorClass || 'bg-slate-800 text-slate-400'}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <p className="text-text-dim text-sm font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-text-bright tracking-tight">{value}</p>
    </div>
  </Card>
);

const StatsCards = ({ stats: propStats }) => {
  const { stats: contextStats } = useBot() || {};
  const stats = propStats || contextStats;

  const data = [
    {
      title: 'Total Trades',
      value: stats?.total_trades || 0,
      icon: BarChart2,
      trend: 'up',
      trendValue: '+12%',
      colorClass: 'bg-primary/10 text-primary',
    },
    {
      title: 'Win Rate',
      value: formatPercent(stats?.win_rate || 0),
      icon: Award,
      colorClass: 'bg-success/10 text-success',
    },
    {
      title: 'Total P&L',
      value: formatCurrency(stats?.total_pnl || 0),
      icon: DollarSign,
      trend: (stats?.total_pnl || 0) >= 0 ? 'up' : 'down',
      trendValue: (stats?.total_pnl || 0) >= 0 ? 'Profit' : 'Loss',
      colorClass: (stats?.total_pnl || 0) >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
    },
    {
      title: 'Avg Volatility',
      value: formatVolatility(stats?.avg_volatility || 0),
      icon: Activity,
      colorClass: 'bg-warning/10 text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {data.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
