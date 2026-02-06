import React from 'react';
import { Activity, TrendingUp, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useBotStatus } from '../../hooks/useBotStatus';

const BotStatus = ({ status: propStatus }) => {
  const { status: hookStatus, loading, error } = useBotStatus();
  const status = propStatus || hookStatus;
  
  // Check both is_connected (from API) and isConnected (from local error state)
  const isConnected = propStatus 
    ? (propStatus.is_connected !== false && propStatus.isConnected !== false) 
    : !error;

  if (loading && !status) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-pulse h-[300px]">
        <div className="flex justify-between mb-6">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-slate-700 rounded"></div>
              <div className="w-48 h-4 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-20 bg-slate-700 rounded"></div>
          <div className="h-20 bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border-2 border-red-500/50">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity className="text-red-500 w-8 h-8" />
          <h2 className="text-xl font-semibold text-red-500">Connection Error</h2>
        </div>
        <p className="text-center text-red-400">Unable to reach the bot server.</p>
      </div>
    );
  }

  const {
    status: botState,
    current_volatility: currentVolatility,
    threshold,
    last_trade_time: lastTradeTime,
    next_wake_window: nextWakeWindow
  } = status || {};
  
  const isActive = botState === 'active';
  const volatilityColor = currentVolatility < threshold ? 'text-green-400' : 'text-red-400';
  const statusColor = isActive ? 'text-green-500' : 'text-purple-500';
  const statusEmoji = isActive ? '🤖' : '😴';
  const statusText = isActive ? 'ACTIVE - Trading' : 'SLEEPING - Standby';
  
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{statusEmoji}</span>
          <div>
            <h2 className={`text-2xl font-bold ${statusColor}`}>
              {statusText}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {isActive ? 'Bot is actively monitoring markets' : 'Waiting for low volatility conditions'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-purple-500'}`}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Current Volatility</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${volatilityColor}`}>
              {currentVolatility?.toFixed(3) || '0.000'}
            </span>
            <span className="text-sm text-gray-500">/ {threshold?.toFixed(2) || '0.15'}</span>
          </div>
          <p className={`text-xs mt-1 ${volatilityColor}`}>
            {currentVolatility < threshold 
              ? '✓ Below threshold - Safe to trade' 
              : '✗ Above threshold - Too volatile'}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Last Trade</span>
          </div>
          <div className="text-xl font-semibold text-gray-200">
            {lastTradeTime 
              ? formatDistanceToNow(new Date(lastTradeTime), { addSuffix: true }) 
              : 'No trades yet'}
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Next Trading Window</span>
          <span className="text-sm font-mono text-purple-400">{nextWakeWindow || '01:00-04:00 UTC'}</span>
        </div>
      </div>
    </div>
  );
};

export default BotStatus;
