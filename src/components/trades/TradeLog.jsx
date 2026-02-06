import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TradeFilters from './TradeFilters';
import TradeTable from './TradeTable';
import { useTradeData } from '../../hooks/useTradeData';

const TradeLog = () => {
  const { trades, total, loading, filters, updateFilters } = useTradeData();
  const [selectedTrade, setSelectedTrade] = useState(null);

  const totalPages = Math.ceil(total / filters.per_page);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateFilters({ page: newPage });
    }
  };

  const handleExport = () => {
    // Basic CSV export logic
    const headers = ['Timestamp', 'Type', 'Asset', 'Volatility', 'Entry', 'SL', 'TP', 'Status', 'Rationale'];
    const rows = trades.map(t => [
      t.timestamp, t.type, t.asset, t.volatility_score, t.entry_price, t.stop_loss, t.take_profit, t.status, `"${t.rationale}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sleepybot_trades_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-bright">Trade History</h2>
          <p className="text-text-dim text-sm mt-1">
            Total of <span className="text-primary font-semibold">{total}</span> trades logged since bot initialization.
          </p>
        </div>
      </div>

      <TradeFilters 
        filters={filters} 
        onFilterChange={updateFilters} 
        onExport={handleExport}
      />

      <Card className="p-0 overflow-hidden">
        <TradeTable 
          trades={trades} 
          loading={loading} 
          onRowClick={setSelectedTrade}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-700 flex justify-between items-center bg-slate-800/20">
            <span className="text-sm text-text-dim">
              Showing <span className="text-text-muted font-medium">{(filters.page - 1) * filters.per_page + 1}</span> to <span className="text-text-muted font-medium">{Math.min(filters.page * filters.per_page, total)}</span> of <span className="text-text-muted font-medium">{total}</span> entries
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={filters.page === 1 || loading}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={filters.page === i + 1 ? 'primary' : 'outline'}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => handlePageChange(i + 1)}
                    disabled={loading}
                  >
                    {i + 1}
                  </Button>
                )).slice(Math.max(0, filters.page - 3), Math.min(totalPages, filters.page + 2))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={filters.page === totalPages || loading}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Trade Detail Modal */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card 
            className="w-full max-w-2xl shadow-2xl relative"
            title={`Trade Details: ${selectedTrade.id}`}
            extra={
              <button 
                onClick={() => setSelectedTrade(null)}
                className="text-text-dim hover:text-text-bright transition-colors"
              >
                <X size={20} />
              </button>
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-text-dim uppercase">Asset</p>
                  <p className="font-semibold text-text-bright">{selectedTrade.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-dim uppercase">Type</p>
                  <p className="font-semibold text-text-bright">{selectedTrade.type}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-text-dim uppercase tracking-wider">Raw JSON Payload</p>
                <pre className="bg-slate-900 p-4 rounded-lg overflow-auto max-h-[300px] text-xs font-mono text-success/80 border border-slate-700">
                  {JSON.stringify(selectedTrade, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => setSelectedTrade(null)}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TradeLog;
