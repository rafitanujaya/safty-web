import React from 'react';
import { useTrendData } from '../../../hooks/useDashboardData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp } from 'lucide-react';

export function TrendChart() {
  const { data: trendData, isLoading } = useTrendData();

  return (
    <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col min-h-[380px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Total Threats</h3>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl font-bold text-slate-900">$446.7K</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +24.8%
            </span>
            <span className="text-xs text-slate-400">vs. last period</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 w-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                dy={12} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                dx={-8}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', background: '#fff', fontSize: 13 }}
                cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="safe" name="Safe" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSafe)" activeDot={{ r: 5, strokeWidth: 0, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
