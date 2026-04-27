import React from 'react';
import { useCategoryData } from '../../../hooks/useDashboardData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

export function CategoryBreakdown() {
  const { data: categoryData, isLoading } = useCategoryData();

  const total = categoryData?.reduce((acc, curr) => acc + curr.value, 0) || 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col min-h-[380px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Severity Breakdown</h3>
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
                  formatter={(value: number) => [`${((value / total) * 100).toFixed(1)}%`, 'Share']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', background: '#fff', fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">
                {categoryData.find(c => c.name === 'HIGH')?.value || categoryData[1]?.value}%
              </span>
              <span className="text-xs text-slate-400 font-medium">High/Critical</span>
            </div>
          </div>
        )}
      </div>

      {!isLoading && categoryData && (
        <div className="mt-4">
           <div className="grid grid-cols-2 gap-2 text-xs font-medium">
             {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded bg-slate-200" style={{ backgroundColor: category.color }} />
                   <span className="text-slate-600">{category.name} ({category.value}%)</span>
                </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
