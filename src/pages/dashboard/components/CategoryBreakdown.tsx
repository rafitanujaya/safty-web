import React from 'react';
import { useCategoryData } from '../../../hooks/useDashboardData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

export function CategoryBreakdown() {
  const { data: categoryData, isLoading } = useCategoryData();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col min-h-[380px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Repeat Detection Rate</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center">
        {isLoading || !categoryData ? (
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        ) : (
          <div className="relative">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Rate']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', background: '#fff', fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">68%</span>
              <span className="text-xs text-slate-400 font-medium">On track</span>
            </div>
          </div>
        )}
      </div>

      {!isLoading && categoryData && (
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400 font-medium">On track for 80% target</p>
          <button className="text-xs text-blue-600 font-semibold mt-2 hover:text-blue-700 transition-colors">
            Show details
          </button>
        </div>
      )}
    </div>
  );
}
