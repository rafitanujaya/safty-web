import React from 'react';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

/* ── mini decorative sparkline ─────────────────────────── */
function Sparkline({ color = 'currentColor', inverted = false }: { color?: string; inverted?: boolean }) {
  const points = inverted
    ? '0,28 12,22 24,26 36,18 48,24 60,14 72,20 84,10 96,16'
    : '0,28 12,18 24,24 36,12 48,20 60,8 72,16 84,6 96,12';
  return (
    <svg width="96" height="36" viewBox="0 0 96 36" fill="none" className="opacity-70">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ── card variants ─────────────────────────────────────── */
type CardVariant = 'featured' | 'accent' | 'muted' | 'danger';

interface CardConfig {
  label: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
  trendLabel: string;
  variant: CardVariant;
}

const variantStyles: Record<CardVariant, {
  wrapper: string;
  iconWrap: string;
  label: string;
  value: string;
  trendUp: string;
  trendDown: string;
  trendBase: string;
  sparkColor: string;
}> = {
  featured: {
    wrapper: 'bg-[#0967F7] text-white',
    iconWrap: 'bg-white/15',
    label: 'text-blue-100',
    value: 'text-white',
    trendUp: 'bg-white/20 text-white',
    trendDown: 'bg-red-400/30 text-red-100',
    trendBase: '',
    sparkColor: '#93c5fd',
  },
  accent: {
    wrapper: 'bg-[#082051] text-white',
    iconWrap: 'bg-white/10',
    label: 'text-blue-200',
    value: 'text-white',
    trendUp: 'bg-white/15 text-blue-100',
    trendDown: 'bg-red-400/25 text-red-200',
    trendBase: '',
    sparkColor: '#5969AB',
  },
  muted: {
    wrapper: 'bg-white border border-slate-100',
    iconWrap: 'bg-amber-50',
    label: 'text-slate-500',
    value: 'text-slate-900',
    trendUp: 'bg-emerald-50 text-emerald-600',
    trendDown: 'bg-red-50 text-red-500',
    trendBase: '',
    sparkColor: '#f59e0b',
  },
  danger: {
    wrapper: 'bg-white border border-slate-100',
    iconWrap: 'bg-blue-50',
    label: 'text-slate-500',
    value: 'text-slate-900',
    trendUp: 'bg-emerald-50 text-emerald-600',
    trendDown: 'bg-red-50 text-red-500',
    trendBase: '',
    sparkColor: '#0967F7',
  },
};

function StatCard({ item, featured = false }: { item: CardConfig; featured?: boolean }) {
  const v = variantStyles[item.variant];
  const Icon = item.icon;
  const TrendIcon = item.trendUp ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        'relative rounded-3xl p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
        featured ? 'row-span-2 min-h-[220px]' : 'min-h-[100px]',
        v.wrapper
      )}
    >
      {/* top row: icon + label */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={cn('p-2 rounded-xl', v.iconWrap)}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={cn('text-xs font-medium leading-tight max-w-[120px]', v.label)}>
            {item.label}
          </span>
        </div>

        {/* trend badge */}
        <span
          className={cn(
            'shrink-0 flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full',
            item.trendUp ? v.trendUp : v.trendDown
          )}
        >
          <TrendIcon className="w-2.5 h-2.5" />
          {item.trend}
        </span>
      </div>

      {/* value */}
      <div>
        <p className={cn('text-3xl font-bold tracking-tight mt-2', v.value)}>
          {item.value}
        </p>
        <p className={cn('text-[11px] mt-0.5 opacity-70', v.label)}>
          {item.trendLabel}
        </p>
      </div>

      {/* decorative sparkline — bottom-right */}
      {featured && (
        <div className="absolute bottom-3 right-3 opacity-50 pointer-events-none">
          <Sparkline color={v.sparkColor} inverted={!item.trendUp} />
        </div>
      )}

      {/* subtle glow circle for featured */}
      {featured && (
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />
      )}
    </div>
  );
}

/* ── main export ───────────────────────────────────────── */
export function OverviewCards() {
  const { summary: stats, isLoading } = useDashboardData();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 animate-pulse" style={{ gridTemplateRows: 'auto auto' }}>
        <div className="col-span-1 row-span-2 rounded-3xl bg-slate-200 h-[220px]" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-3xl bg-slate-100 h-[100px]" />
        ))}
      </div>
    );
  }

  const items: CardConfig[] = [
    {
      label: 'Total Threats Blocked',
      value: stats.totalThreatsBlocked.toLocaleString(),
      icon: ShieldCheck,
      trend: '+12.4%',
      trendUp: true,
      trendLabel: 'vs. last 7 days',
      variant: 'featured',
    },
    {
      label: 'Phishing Detections',
      value: stats.phishingDetections.toLocaleString(),
      icon: ShieldAlert,
      trend: '+23.1%',
      trendUp: false,
      trendLabel: 'vs. last 7 days',
      variant: 'accent',
    },
    {
      label: 'Malicious Activity',
      value: stats.maliciousActivity.toLocaleString(),
      icon: AlertTriangle,
      trend: '-5.2%',
      trendUp: true,
      trendLabel: 'vs. last 7 days',
      variant: 'muted',
    },
    {
      label: 'Suspicious Interactions',
      value: stats.suspiciousInteractions.toLocaleString(),
      icon: AlertCircle,
      trend: '+8.4%',
      trendUp: false,
      trendLabel: 'vs. last 7 days',
      variant: 'danger',
    },
  ];

  return (
    <>
      {/* Mobile: simple 2-col grid */}
      <div className="grid grid-cols-2 gap-4 lg:hidden">
        {items.map((item, i) => (
          <StatCard key={i} item={item} featured={i < 2} />
        ))}
      </div>

      {/* Desktop: bento layout */}
      <div
        className="hidden lg:grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto auto',
        }}
      >
        {/* Featured card: col 1, row 1-2 */}
        <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
          <StatCard item={items[0]} featured />
        </div>

        {/* Card 2 accent: col 2, row 1-2 */}
        <div style={{ gridColumn: '2', gridRow: '1 / 3' }}>
          <StatCard item={items[1]} featured />
        </div>

        {/* Card 3 & 4: half-height */}
        <div style={{ gridColumn: '3', gridRow: '1' }}>
          <StatCard item={items[2]} />
        </div>
        <div style={{ gridColumn: '4', gridRow: '1' }}>
          <StatCard item={items[3]} />
        </div>

        {/* Protection status banner: cols 3-4, row 2 */}
        <div
          style={{ gridColumn: '3 / 5', gridRow: '2' }}
          className="rounded-3xl bg-gradient-to-r from-[#0967F7]/8 to-[#5969AB]/8 border border-[#0967F7]/10 p-4 flex items-center gap-4"
        >
          <div className="p-2.5 rounded-2xl bg-[#0967F7]/10">
            <ShieldCheck className="w-5 h-5 text-[#0967F7]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">System Protection Active</p>
            <p className="text-xs text-slate-400 mt-0.5">All modules running · Last scan: just now</p>
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
