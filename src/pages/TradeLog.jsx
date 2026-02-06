import React from 'react';

const TradeLog = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">📋 Trade History</h1>
      <div className="bg-slate-800 rounded-lg p-12 border-2 border-dashed border-slate-700 text-center">
        <p className="text-6xl mb-4">📋</p>
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">No Trades Yet</h2>
        <p className="text-gray-500">Trade history will appear here once the bot executes trades.</p>
      </div>
    </div>
  );
};

export default TradeLog;
