import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Area, 
  ComposedChart,
  Line
} from 'recharts';
import { useVolatility } from '../../hooks/useVolatility';

const VolatilityChart = ({ threshold = 0.15, data: propData }) => {
  const { data: hookData, loading } = useVolatility();
  const data = propData || hookData;

  if (loading && (!data || data.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-lg border border-slate-700">
        <p className="text-gray-500">No volatility data available</p>
      </div>
    );
  }
  
  // Add zones for coloring
  // Instruction uses 'volatility' but my current data uses 'score'?
  // Looking at the instruction: d.volatility < threshold
  // Let's adapt to whatever the data has. I'll check my useVolatility or assume instructions.
  // Actually, I should use 'volatility' as requested in instructions.
  
  const dataWithZones = data.map(d => {
    const vol = d.volatility !== undefined ? d.volatility : d.score;
    return {
      ...d,
      volatility: vol,
      safeZone: vol < threshold ? vol : threshold,
      dangerZone: vol >= threshold ? vol : threshold,
    };
  });
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
          <p className="text-sm text-gray-400">{payload[0].payload.time}</p>
          <p className="text-sm font-semibold text-white">
            Volatility: {payload[0].value.toFixed(3)}
          </p>
          <p className={`text-xs ${payload[0].value < threshold ? 'text-green-400' : 'text-red-400'}`}>
            {payload[0].value < threshold ? '✓ Safe to trade' : '✗ Too volatile'}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4">Volatility Analysis (24h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dataWithZones}>
          <defs>
            <linearGradient id="safeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(str) => str.split(' ')[0]}
          />
          <YAxis 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickMargin={10}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine 
            y={threshold} 
            stroke="#ef4444" 
            strokeDasharray="5 5" 
            strokeWidth={2}
            label={{ 
              value: `Threshold (${threshold})`, 
              position: 'right', 
              fill: '#ef4444', 
              fontSize: 12 
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="safeZone" 
            stroke="none" 
            fill="url(#safeGradient)" 
          />
          
          <Area 
            type="monotone" 
            dataKey="dangerZone" 
            stroke="none" 
            fill="url(#dangerGradient)" 
          />
          
          <Line 
            type="monotone" 
            dataKey="volatility" 
            stroke="#6366f1" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 6, fill: '#6366f1' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolatilityChart;
