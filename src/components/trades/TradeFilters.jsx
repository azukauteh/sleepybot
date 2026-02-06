import React from 'react';
import { Search, Download, Filter, X } from 'lucide-react';
import Button from '../ui/Button';

const TradeFilters = ({ filters, onFilterChange, onExport }) => {
  const handleSearch = (e) => {
    onFilterChange({ search: e.target.value });
  };

  return (
    <div className="bg-background-lighter p-4 rounded-lg border border-slate-700 mb-6 flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
        <input
          type="text"
          placeholder="Search by ID, asset, or rationale..."
          className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          value={filters.search || ''}
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          className="bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={filters.type || ''}
          onChange={(e) => onFilterChange({ type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <select
          className="bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="EXECUTED">EXECUTED</option>
          <option value="LOGGED">LOGGED</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-md px-2">
          <span className="text-[10px] text-text-dim uppercase font-bold mr-2">From</span>
          <input
            type="date"
            className="bg-transparent py-2 text-sm focus:outline-none text-text-bright"
            value={filters.date_start || ''}
            onChange={(e) => onFilterChange({ date_start: e.target.value })}
          />
        </div>
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-md px-2">
          <span className="text-[10px] text-text-dim uppercase font-bold mr-2">To</span>
          <input
            type="date"
            className="bg-transparent py-2 text-sm focus:outline-none text-text-bright"
            value={filters.date_end || ''}
            onChange={(e) => onFilterChange({ date_end: e.target.value })}
          />
        </div>
      </div>

      <div className="h-6 w-[1px] bg-slate-700 hidden sm:block" />

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onFilterChange({})} title="Clear Filters">
          <X size={16} />
        </Button>
        <Button variant="secondary" size="sm" className="gap-2" onClick={onExport}>
          <Download size={16} /> Export CSV
        </Button>
      </div>
    </div>
  );
};

export default TradeFilters;
