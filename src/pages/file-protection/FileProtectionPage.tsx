import React, { useState, useRef, useCallback } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { useScanFile } from '../../hooks/useFiles';
import { cn } from '../../utils/cn';
import {
  Upload, File, FileText, Archive, Code2, AlertTriangle, CheckCircle2,
  XCircle, ShieldAlert, Trash2, Download, Flag, Clock, ChevronRight,
  ScanLine, RotateCcw,
} from 'lucide-react';

type ScanState = 'idle' | 'uploading' | 'scanning' | 'result';
type RiskLevel  = 'LOW' | 'MEDIUM' | 'HIGH';
type Verdict    = 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS';

interface ScanResult {
  riskLevel: RiskLevel;
  riskScore: number;
  verdict: Verdict;
  detections: string[];
  scanDuration: number;
}

interface HistoryEntry {
  id: string;
  filename: string;
  verdict: Verdict;
  size: string;
}


function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
  if (['zip','rar','7z','tar'].includes(ext)) return <Archive className="w-8 h-8 text-amber-500" />;
  if (['exe','bat','cmd','scr'].includes(ext)) return <Code2 className="w-8 h-8 text-purple-600" />;
  return <File className="w-8 h-8 text-[#0967F7]" />;
}

const VERDICT_CFG = {
  SAFE:       { label: 'Safe',       color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', icon: CheckCircle2 },
  SUSPICIOUS: { label: 'Suspicious', color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200',   bar: 'bg-amber-500',   icon: AlertTriangle },
  MALICIOUS:  { label: 'Malicious',  color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     bar: 'bg-red-500',     icon: XCircle },
} satisfies Record<Verdict, { label: string; color: string; bg: string; border: string; bar: string; icon: React.ElementType }>;

/* ── Upload zone ─────────────────────────────────────── */
function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => ref.current?.click()}
      className={cn(
        'flex flex-col items-center justify-center gap-5 cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-200 py-16 text-center',
        dragging ? 'border-[#0967F7] bg-[#0967F7]/5' : 'border-slate-200 bg-white hover:border-[#0967F7]/40 hover:bg-slate-50/50'
      )}
    >
      <input ref={ref} type="file" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <div className={cn('w-20 h-20 rounded-3xl flex items-center justify-center', dragging ? 'bg-[#0967F7]/15' : 'bg-slate-50')}>
        <Upload className={cn('w-9 h-9', dragging ? 'text-[#0967F7]' : 'text-slate-400')} />
      </div>
      <div>
        <p className="text-base font-semibold text-slate-700">{dragging ? 'Drop to scan' : 'Drop your file here'}</p>
        <p className="text-sm text-slate-400 mt-1">or <span className="text-[#0967F7] font-medium">browse files</span></p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {['EXE','ZIP','PDF','DOC','XLS','BAT','JS','RAR'].map(t => (
          <span key={t} className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">.{t.toLowerCase()}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Uploading state ─────────────────────────────────── */
function UploadingState({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <div className="w-20 h-20 rounded-3xl bg-[#0967F7]/10 flex items-center justify-center">
        <Upload className="w-9 h-9 text-[#0967F7]" />
      </div>
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Uploading…</span><span>{progress}%</span></div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#0967F7] rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ── Scanning state ──────────────────────────────────── */
function ScanningState({ filename }: { filename: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-16">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-3xl bg-[#0967F7]/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanLine className="w-9 h-9 text-[#0967F7]" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-700">Scanning file…</p>
        <p className="text-sm text-slate-400 mt-1 font-mono truncate max-w-[240px]">{filename}</p>
      </div>
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <span key={i} className="w-2 h-2 rounded-full bg-[#0967F7] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Result panel ────────────────────────────────────── */
function ResultPanel({ file, result, onReset }: { file: File; result: ScanResult; onReset: () => void }) {
  const cfg = VERDICT_CFG[result.verdict];
  const Icon = cfg.icon;

  return (
    <div className="space-y-4">
      {/* Verdict row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
          {getFileIcon(file.name)}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{formatBytes(file.size)}</p>
          </div>
        </div>
        <div className={cn('md:col-span-2 rounded-2xl border p-5 flex items-center gap-5', cfg.bg, cfg.border)}>
          <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', cfg.bg)}>
            <Icon className={cn('w-7 h-7', cfg.color)} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scan Verdict</p>
            <p className={cn('text-2xl font-bold mt-0.5', cfg.color)}>{cfg.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">Completed in {result.scanDuration}s</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-400">Risk Score</p>
            <p className={cn('text-3xl font-bold', cfg.color)}>{result.riskScore}</p>
            <p className="text-xs text-slate-400">/ 100</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Risk Level</p>
          <p className={cn('text-sm font-bold mb-3', cfg.color)}>{result.riskLevel}</p>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full transition-all duration-700', cfg.bar)} style={{ width: `${result.riskScore}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-300 mt-1.5"><span>0</span><span>50</span><span>100</span></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Detection Details</p>
          <ul className="space-y-2.5">
            {result.detections.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className={cn('mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center', cfg.bg)}>
                  <Icon className={cn('w-2.5 h-2.5', cfg.color)} />
                </span>
                <span className="text-sm text-slate-600">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors border border-red-100">
          <Trash2 className="w-4 h-4" /> Delete File
        </button>
        {result.verdict !== 'MALICIOUS' && (
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
            <Download className="w-4 h-4" /> Download Anyway
          </button>
        )}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-600 text-sm font-semibold hover:bg-amber-100 transition-colors border border-amber-100">
          <Flag className="w-4 h-4" /> Report File
        </button>
        <button onClick={onReset} className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0967F7]/10 text-[#0967F7] text-sm font-semibold hover:bg-[#0967F7]/15 transition-colors">
          <RotateCcw className="w-4 h-4" /> Scan Another
        </button>
      </div>
    </div>
  );
}

/* ── History list ────────────────────────────────────── */
function ScanHistory({ entries }: { entries: HistoryEntry[] }) {
  if (!entries.length) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <p className="text-sm font-semibold text-slate-700">Recent Scans</p>
      </div>
      <ul className="space-y-2">
        {entries.map(e => (
          <li key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <span className={cn('w-2 h-2 rounded-full shrink-0',
              e.verdict === 'SAFE' ? 'bg-emerald-500' : e.verdict === 'SUSPICIOUS' ? 'bg-amber-500' : 'bg-red-500')} />
            <span className="text-xs font-mono text-slate-700 truncate flex-1">{e.filename}</span>
            <span className="text-[10px] text-slate-400">{e.size}</span>
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full',
              e.verdict === 'SAFE' ? 'bg-emerald-50 text-emerald-600' :
              e.verdict === 'SUSPICIOUS' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
            )}>{e.verdict}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */
export function FileProtectionPage() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [progress, setProgress]   = useState(0);
  const [file, setFile]           = useState<File | null>(null);
  const [result, setResult]       = useState<ScanResult | null>(null);
  const [history, setHistory]     = useState<HistoryEntry[]>([]);
  const { mutateAsync: scanFileMutation } = useScanFile();

  const handleFile = async (f: File) => {
    setFile(f); setResult(null);
    setScanState('uploading');
    for (let p = 0; p <= 100; p += 20) {
      await new Promise(r => setTimeout(r, 70));
      setProgress(p);
    }
    setScanState('scanning');
    try {
      const res = await scanFileMutation(f);
      setResult(res);
      setScanState('result');
      setHistory(prev => [{ id: Date.now().toString(), filename: f.name, verdict: res.verdict as Verdict, size: formatBytes(f.size) }, ...prev.slice(0, 4)]);
    } catch (e) {
      console.error(e);
      setScanState('idle');
    }
  };

  const handleReset = () => { setScanState('idle'); setFile(null); setResult(null); setProgress(0); };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-2xl bg-[#0967F7]/10">
              <ShieldAlert className="w-5 h-5 text-[#0967F7]" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">File Protection Scanner</h1>
          </div>
          <p className="text-sm text-slate-400 ml-14">Upload a file to check for malware, scams, or suspicious behavior</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          {scanState === 'idle'      && <UploadZone onFile={handleFile} />}
          {scanState === 'uploading' && <UploadingState progress={progress} />}
          {scanState === 'scanning'  && file && <ScanningState filename={file.name} />}
          {scanState === 'result'    && file && result && <ResultPanel file={file} result={result} onReset={handleReset} />}
        </div>

        <ScanHistory entries={history} />
      </div>
    </DashboardLayout>
  );
}
