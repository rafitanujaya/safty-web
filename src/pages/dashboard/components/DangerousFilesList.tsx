import React from 'react';
import { useDangerousFiles } from '../../../hooks/useDashboardData';
import { FileWarning, FileArchive, FileCode, FileText, File, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { FileType } from '../../../api/mockData';

const fileTypeIcons: Record<FileType, React.ElementType> = {
  exe: FileWarning,
  zip: FileArchive,
  pdf: FileText,
  doc: FileText,
  js: FileCode,
  bat: FileCode,
  msi: File,
  dmg: File,
  apk: File,
};

const fileTypeColors: Record<FileType, string> = {
  exe: 'text-red-500 bg-red-50',
  zip: 'text-amber-500 bg-amber-50',
  pdf: 'text-orange-500 bg-orange-50',
  doc: 'text-blue-500 bg-blue-50',
  js: 'text-yellow-500 bg-yellow-50',
  bat: 'text-purple-500 bg-purple-50',
  msi: 'text-indigo-500 bg-indigo-50',
  dmg: 'text-slate-500 bg-slate-50',
  apk: 'text-green-500 bg-green-50',
};

export function DangerousFilesList() {
  const { data: files, isLoading } = useDangerousFiles();

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-100';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-blue-600 bg-blue-50 border-blue-100';
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMin = Math.round((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return `${Math.floor(diffMin / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Dangerous Files Detected</h3>
          <p className="text-xs text-slate-400 mt-0.5">Malicious or suspicious file downloads</p>
        </div>
        {files && (
          <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
            {files.length} files
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">File</th>
              <th className="px-6 py-3 font-semibold">Source</th>
              <th className="px-6 py-3 font-semibold">Risk</th>
              <th className="px-6 py-3 font-semibold">Action</th>
              <th className="px-6 py-3 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400 mx-auto" />
                </td>
              </tr>
            ) : (
              files?.slice(0, 5).map((file) => {
                const Icon = fileTypeIcons[file.fileType] || File;
                const iconColor = fileTypeColors[file.fileType] || 'text-slate-500 bg-slate-50';
                return (
                  <tr key={file.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn('p-2 rounded-lg', iconColor)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700 block text-xs">{file.fileName}</span>
                          <span className="text-[11px] text-slate-400">{file.fileSize} · .{file.fileType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs text-slate-500 font-mono truncate max-w-[160px] block">{file.sourceDomain}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-xs font-bold px-2 py-0.5 rounded-md border', getRiskColor(file.riskScore))}>
                          {file.riskScore}
                        </span>
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', file.riskScore >= 80 ? 'bg-red-500' : file.riskScore >= 60 ? 'bg-amber-500' : 'bg-blue-500')}
                            style={{ width: `${file.riskScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={cn(
                        'text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border',
                        file.action_taken === 'BLOCKED'
                          ? 'text-red-600 bg-red-50 border-red-100'
                          : 'text-amber-600 bg-amber-50 border-amber-100'
                      )}>
                        {file.action_taken}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs text-slate-400 font-medium">{formatTime(file.detected_at)}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
