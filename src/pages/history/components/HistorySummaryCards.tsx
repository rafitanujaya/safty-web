import React from 'react';
import { ShieldX, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

/* ── mini sparkline ───────────────────────────────────── */
function Sparkline({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="96" height="36" viewBox="0 0 96 36" fill="none" className="opacity-60">
      <polyline
        points="0,30 16,20 32,26 48,12 64,22 80,8 96,16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ── types ────────────────────────────────────────────── */
interface HistorySummaryCardsProps {
  totalEvents: number;
  totalBlocked: number;
  totalWarning: number;
  avgRisk: number;
}

/* ── main component ───────────────────────────────────── */
export function HistorySummaryCards({
  totalEvents,
  totalBlocked,
  totalWarning,
  avgRisk,
}: HistorySummaryCardsProps) {
  const riskTrendUp = avgRisk > 50;

  return (
    <>
      {/* Mobile: simple 2-col */}
      <div className="grid grid-cols-2 gap-4 lg:hidden">
        {/* Card 1 */}
        <div className="rounded-3xl bg-[#0967F7] text-white p-5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/15">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-blue-100">Total Events</span>
          </div>
          <p className="text-3xl font-bold tracking-tight mt-2">{totalEvents.toLocaleString()}</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl bg-[#082051] text-white p-5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10">
              <ShieldX className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-blue-200">Blocked / Warnings</span>
          </div>
          <p className="text-3xl font-bold tracking-tight mt-2">
            <span className="text-red-300">{totalBlocked}</span>
            <span className="text-white/30 mx-1">/</span>
            <span className="text-amber-300">{totalWarning}</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="col-span-2 rounded-3xl bg-white border border-slate-100 p-5 flex flex-col justify-between min-h-[100px]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-xs font-medium text-slate-500">Average Risk Score</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
            {avgRisk}
            <span className="text-sm text-slate-400 font-normal"> / 100</span>
          </p>
        </div>
      </div>

      {/* Desktop: bento layout */}
      <div
        className="hidden lg:grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto auto',
        }}
      >
        {/* Card 1 — featured: col 1, row 1-2 */}
        <div
          style={{ gridColumn: '1', gridRow: '1 / 3' }}
          className="relative rounded-3xl bg-[#0967F7] text-white p-5 flex flex-col justify-between min-h-[220px] overflow-hidden
                     transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {/* decorative circle */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/15">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-blue-100">Total Events</span>
            </div>
            <span className="shrink-0 flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
              <TrendingUp className="w-2.5 h-2.5" />
              All Time
            </span>
          </div>

          <div>
            <p className="text-3xl font-bold tracking-tight mt-2">{totalEvents.toLocaleString()}</p>
            <p className="text-[11px] mt-0.5 text-blue-200 opacity-70">filtered threat events</p>
          </div>

          {/* sparkline */}
          <div className="absolute bottom-3 right-3 opacity-50 pointer-events-none">
            <Sparkline color="#93c5fd" />
          </div>
        </div>

        {/* Card 2 — accent: col 2, row 1-2 */}
        <div
          style={{ gridColumn: '2', gridRow: '1 / 3' }}
          className="relative rounded-3xl bg-secondary text-white p-5 flex flex-col justify-between min-h-[220px] overflow-hidden
                     transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10">
                <ShieldX className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white">Blocked / Warnings</span>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold tracking-tight mt-2">
              <span className="text-white">{totalBlocked}</span>
              <span className="text-white mx-1.5">/</span>
              <span className="text-white">{totalWarning}</span>
            </p>
            <div className="flex gap-3 mt-1.5">
              <span className="text-[11px] text-white opacity-80">blocked</span>
              <span className="text-[11px] text-white opacity-80">warned</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 opacity-50 pointer-events-none">
            <Sparkline color="#5969AB" />
          </div>
        </div>

        {/* Card 3 — avg risk: col 3, row 1 */}
        <div
          style={{ gridColumn: '3', gridRow: '1' }}
          className="rounded-3xl bg-white border border-slate-100 p-5 flex flex-col justify-between min-h-[100px]
                     transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-xs font-medium text-slate-500 leading-tight">Avg Risk Score</span>
            </div>
            <span className={cn(
              'shrink-0 flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full',
              riskTrendUp ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'
            )}>
              {riskTrendUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {avgRisk > 75 ? 'High' : avgRisk > 40 ? 'Medium' : 'Low'}
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
              {avgRisk}
              <span className="text-sm text-slate-400 font-normal"> / 100</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">average across filtered events</p>
          </div>
        </div>

        {/* Card 4 — blocked rate: col 4, row 1 */}
        <div
          style={{ gridColumn: '4', gridRow: '1' }}
          className="rounded-3xl bg-white border border-slate-100 p-5 flex flex-col justify-between min-h-[100px]
                     transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50">
                <ShieldX className="w-4 h-4 text-[#0967F7]" />
              </div>
              <span className="text-xs font-medium text-slate-500 leading-tight">Block Rate</span>
            </div>
            <span className="shrink-0 flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-2.5 h-2.5" />
              Active
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
              {totalEvents > 0 ? Math.round((totalBlocked / totalEvents) * 100) : 0}
              <span className="text-sm text-slate-400 font-normal">%</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">of events were blocked</p>
          </div>
        </div>

        {/* Banner row — cols 3-4, row 2 */}
        <div
          style={{ gridColumn: '3 / 5', gridRow: '2' }}
          className="rounded-3xl bg-gradient-to-r from-[#0967F7]/8 to-[#5969AB]/8 border border-[#0967F7]/10 p-4 flex items-center gap-4"
        >
          <div className="p-2.5 rounded-2xl bg-[#0967F7]/10">
            <Activity className="w-5 h-5 text-[#0967F7]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Threat History Log</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {totalEvents} event{totalEvents !== 1 ? 's' : ''} · {totalBlocked} blocked · {totalWarning} warned
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">Live</span>
          </div>
        </div>
      </div>
    </>
  );
}
