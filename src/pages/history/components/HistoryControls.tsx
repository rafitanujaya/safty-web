import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { ThreatCategory } from '../../../api/mockData';

interface HistoryControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterCategory: ThreatCategory | 'ALL';
  onCategoryChange: (cat: ThreatCategory | 'ALL') => void;
  categories: (ThreatCategory | 'ALL')[];
}

export function HistoryControls({
  searchQuery,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  categories,
}: HistoryControlsProps) {
  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-[#0967F7]/30 focus-within:ring-2 focus-within:ring-[#0967F7]/10 transition-all">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          id="history-search"
          type="text"
          placeholder="Search by domain, category, or detection method..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
        />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.replace(/\s+/g, '-').replace('&', 'and').toLowerCase()}`}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
              filterCategory === cat
                ? 'bg-[#0967F7] text-white border-[#0967F7]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
