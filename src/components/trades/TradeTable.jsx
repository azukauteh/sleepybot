import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, Info } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatDate, formatVolatility } from '../../utils/formatters';

const TradeTable = ({ trades, loading, onRowClick }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (loading && trades.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-text-dim flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading trade history...</span>
        </div>
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-text-dim border-2 border-dashed border-slate-700 rounded-lg">
        <Info size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">No trades found</p>
        <p className="text-sm">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-text-dim text-xs uppercase tracking-wider">
            <th className="px-4 py-3 font-semibold"></th>
            <th className="px-4 py-3 font-semibold">Timestamp</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Asset</th>
            <th className="px-4 py-3 font-semibold">Volatility</th>
            <th className="px-4 py-3 font-semibold text-right">Entry</th>
            <th className="px-4 py-3 font-semibold text-right text-danger/80">Stop Loss</th>
            <th className="px-4 py-3 font-semibold text-right text-success/80">Take Profit</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold text-center">Details</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {trades.map((trade) => (
            <React.Fragment key={trade.id}>
              <tr 
                className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors cursor-pointer group"
                onClick={() => onRowClick(trade)}
              >
                <td className="px-4 py-4">
                  <button 
                    onClick={(e) => toggleRow(trade.id, e)}
                    className="p-1 hover:bg-slate-700 rounded transition-colors text-text-dim"
                  >
                    {expandedRows.has(trade.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-text-bright">{formatDate(trade.timestamp)}</td>
                <td className="px-4 py-4">
                  <Badge variant={trade.type === 'BUY' ? 'primary' : 'warning'}>
                    {trade.type}
                  </Badge>
                </td>
                <td className="px-4 py-4 font-medium">{trade.asset}</td>
                <td className="px-4 py-4 font-mono">
                  <span className={trade.volatility_score < 0.15 ? 'text-success' : 'text-danger'}>
                    {formatVolatility(trade.volatility_score)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-mono">{trade.entry_price.toFixed(4)}</td>
                <td className="px-4 py-4 text-right font-mono text-danger/70">{trade.stop_loss.toFixed(4)}</td>
                <td className="px-4 py-4 text-right font-mono text-success/70">{trade.take_profit.toFixed(4)}</td>
                <td className="px-4 py-4">
                  <Badge variant={trade.status === 'EXECUTED' ? 'success' : 'default'}>
                    {trade.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-center">
                  <button 
                    className="text-text-dim hover:text-primary transition-colors p-2"
                    onClick={(e) => { e.stopPropagation(); onRowClick(trade); }}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
              {expandedRows.has(trade.id) && (
                <tr className="bg-slate-800/20">
                  <td colSpan="10" className="px-14 py-4 border-b border-slate-800">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-text-dim uppercase tracking-wider">Rationale:</span>
                      <p className="text-text-muted italic leading-relaxed">
                        "{trade.rationale}"
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;
