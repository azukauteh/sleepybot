import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import Card from '../ui/Card';
import { useBot } from '../../context/BotContext';
import { formatCurrency } from '../../utils/formatters';

const PerformanceChart = () => {
  const { stats } = useBot();

  // Mocking performance data for the week as it's not in the API yet
  const data = [
    { day: 'Mon', pnl: 120 },
    { day: 'Tue', pnl: -45 },
    { day: 'Wed', pnl: 230 },
    { day: 'Thu', pnl: 180 },
    { day: 'Fri', pnl: -20 },
    { day: 'Sat', pnl: 90 },
    { day: 'Sun', pnl: stats?.total_pnl % 500 || 150 },
  ];

  return (
    <Card title="Profit / Loss (Daily)" className="w-full">
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#64748B" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              cursor={{ fill: '#1E293B' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                      <p className="text-sm font-bold" style={{ color: payload[0].value >= 0 ? '#10B981' : '#EF4444' }}>
                        {formatCurrency(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} 
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PerformanceChart;
