import React, { useState } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { useThreatHistory } from '../../hooks/useThreatHistory';
import { HistorySummaryCards } from './components/HistorySummaryCards';
import { HistoryControls } from './components/HistoryControls';
import { HistoryTable } from './components/HistoryTable';
import type { ThreatCategory } from '../../api/mockData';

type SortField = 'timestamp' | 'riskScore' | 'severity';
type SortDirection = 'asc' | 'desc';

const CATEGORIES: (ThreatCategory | 'ALL')[] = [
  'ALL', 'Phishing', 'Malware', 'Suspicious', 'Adware', 'Command & Control',
];

const SEVERITY_ORDER = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 } as const;

export function HistoryPage() {
  const { data, isLoading } = useThreatHistory();
  const history = data?.items || [];

  const [searchQuery, setSearchQuery]       = useState('');
  const [filterCategory, setFilterCategory] = useState<ThreatCategory | 'ALL'>('ALL');
  const [sortField, setSortField]           = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection]   = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSorted = (history ?? [])
    .filter(entry => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        entry.domain.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.detectionMethod.toLowerCase().includes(q);
      const matchesCategory = filterCategory === 'ALL' || entry.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'timestamp')  cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortField === 'riskScore')  cmp = a.riskScore - b.riskScore;
      if (sortField === 'severity')   cmp = SEVERITY_ORDER[a.riskLevel as keyof typeof SEVERITY_ORDER] - SEVERITY_ORDER[b.riskLevel as keyof typeof SEVERITY_ORDER];
      return sortDirection === 'asc' ? cmp : -cmp;
    });

  // Summary stats derived from filtered list
  const totalBlocked = filteredAndSorted.filter((e: any) => e.actionTaken === 'BLOCKED').length;
  const totalWarning  = filteredAndSorted.filter((e: any) => e.actionTaken === 'WARNING').length;
  const avgRisk = filteredAndSorted.length > 0
    ? Math.round(filteredAndSorted.reduce((sum: number, e: any) => sum + e.riskScore, 0) / filteredAndSorted.length)
    : 0;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">

        {/* ── Bento Summary Cards ─────────────────────── */}
        <HistorySummaryCards
          totalEvents={filteredAndSorted.length}
          totalBlocked={totalBlocked}
          totalWarning={totalWarning}
          avgRisk={avgRisk}
        />

        {/* ── Search + Category Filters ───────────────── */}
        <HistoryControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          categories={CATEGORIES}
        />

        {/* ── Sortable History Table ───────────────────── */}
        <HistoryTable
          entries={filteredAndSorted}
          isLoading={isLoading}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

      </div>
    </DashboardLayout>
  );
}
