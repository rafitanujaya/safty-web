import React, { useState, useRef, useCallback } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { cn } from '../../utils/cn';
import {
  Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, XCircle,
  ScanLine, RotateCcw, Flag, BookmarkCheck, Save, Clock, ChevronRight,
  Crosshair,
} from 'lucide-react';

type AnalyzeState = 'idle' | 'uploading' | 'analyzing' | 'result';
type RiskLevel    = 'LOW' | 'MEDIUM' | 'HIGH';
type Verdict      = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

interface AnalysisResult {
  riskLevel: RiskLevel;
  confidence: number;
  verdict: Verdict;
  insights: string[];
  highlights: { label: string; x: number; y: number; w: number; h: number }[];
}

interface HistoryEntry {
  id: string;
  preview: string;
  verdict: Verdict;
  confidence: number;
}

/* ── simulate analysis ────────────────────────────────── */
function simulateAnalysis(dataUrl: string): Promise<AnalysisResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      const rand = Math.random();
      let verdict: Verdict; let confidence: number; let insights: string[];
      let highlights: AnalysisResult['highlights'] = [];

      if (rand < 0.33) {
        verdict = 'SCAM'; confidence = Math.floor(Math.random() * 15) + 82;
        insights = ['Fake login UI detected', 'Suspicious brand impersonation', 'Edited or manipulated content'];
        highlights = [{ label: 'Fake form', x: 15, y: 20, w: 70, h: 40 }, { label: 'Logo spoof', x: 10, y: 5, w: 30, h: 12 }];
      } else if (rand < 0.6) {
        verdict = 'SUSPICIOUS'; confidence = Math.floor(Math.random() * 20) + 55;
        insights = ['Fake verification message detected', 'Unusual UI layout pattern'];
        highlights = [{ label: 'Suspicious text', x: 20, y: 55, w: 60, h: 20 }];
      } else {
        verdict = 'SAFE'; confidence = Math.floor(Math.random() * 15) + 80;
        insights = ['No manipulated content detected', 'No known scam patterns found'];
        highlights = [];
      }

      const riskLevel: RiskLevel = verdict === 'SCAM' ? 'HIGH' : verdict === 'SUSPICIOUS' ? 'MEDIUM' : 'LOW';
      resolve({ riskLevel, confidence, verdict, insights, highlights });
    }, 2500);
  });
}

const VERDICT_CFG = {
  SAFE:       { label: 'Safe',       color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', icon: CheckCircle2 },
  SUSPICIOUS: { label: 'Suspicious', color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200',   bar: 'bg-amber-500',   icon: AlertTriangle },
  SCAM:       { label: 'Scam',       color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     bar: 'bg-red-500',     icon: XCircle },
} satisfies Record<Verdict, { label: string; color: string; bg: string; border: string; bar: string; icon: React.ElementType }>;

/* ── Upload / paste area ──────────────────────────────── */
function UploadArea({ onImage }: { onImage: (dataUrl: string, file: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = e => { if (e.target?.result) onImage(e.target.result as string, f); };
    reader.readAsDataURL(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) processFile(f);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'));
    const f = item?.getAsFile();
    if (f) processFile(f);
  }, []);

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onClick={() => inputRef.current?.click()}
      tabIndex={0}
      className={cn(
        'flex flex-col items-center justify-center gap-5 cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-200 py-16 text-center outline-none',
        dragging ? 'border-[#0967F7] bg-[#0967F7]/5' : 'border-slate-200 bg-white hover:border-[#0967F7]/40 hover:bg-slate-50/50'
      )}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
      <div className={cn('w-20 h-20 rounded-3xl flex items-center justify-center', dragging ? 'bg-[#0967F7]/15' : 'bg-slate-50')}>
        <ImageIcon className={cn('w-9 h-9', dragging ? 'text-[#0967F7]' : 'text-slate-400')} />
      </div>
      <div>
        <p className="text-base font-semibold text-slate-700">{dragging ? 'Drop to analyze' : 'Drop or paste an image'}</p>
        <p className="text-sm text-slate-400 mt-1">
          <span className="text-[#0967F7] font-medium">Browse files</span> · Paste from clipboard (Ctrl+V)
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {['PNG','JPG','WEBP','GIF','BMP','SVG'].map(t => (
          <span key={t} className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">.{t.toLowerCase()}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Uploading ────────────────────────────────────────── */
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

/* ── Analyzing ────────────────────────────────────────── */
function AnalyzingState() {
  return (
    <div className="flex flex-col items-center gap-5 py-16">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-3xl bg-[#0967F7]/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanLine className="w-9 h-9 text-[#0967F7]" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-700">Analyzing image…</p>
        <p className="text-sm text-slate-400 mt-1">Checking for scams and manipulation</p>
      </div>
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <span key={i} className="w-2 h-2 rounded-full bg-[#0967F7] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Image with highlight overlay ────────────────────── */
function ImageWithOverlay({ src, highlights, verdict }: {
  src: string;
  highlights: AnalysisResult['highlights'];
  verdict: Verdict;
}) {
  const boxColor = verdict === 'SCAM' ? 'border-red-500' : verdict === 'SUSPICIOUS' ? 'border-amber-500' : 'border-emerald-500';
  const labelBg  = verdict === 'SCAM' ? 'bg-red-500'    : verdict === 'SUSPICIOUS' ? 'bg-amber-500'    : 'bg-emerald-500';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
      <img src={src} alt="Analyzed" className="w-full object-contain max-h-[420px]" />
      {highlights.map((h, i) => (
        <div
          key={i}
          className={cn('absolute border-2 rounded-lg transition-all duration-500', boxColor)}
          style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
        >
          <span className={cn('absolute -top-5 left-0 text-[10px] text-white font-bold px-1.5 py-0.5 rounded', labelBg)}>
            {h.label}
          </span>
        </div>
      ))}
      {highlights.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-emerald-500/10 border-2 border-emerald-400 rounded-3xl w-16 h-16 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Result panel ────────────────────────────────────── */
function ResultPanel({ dataUrl, result, onReset }: {
  dataUrl: string; result: AnalysisResult; onReset: () => void;
}) {
  const cfg = VERDICT_CFG[result.verdict];
  const Icon = cfg.icon;

  return (
    <div className="space-y-4">
      {/* Top: image + verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Image */}
        <div className="lg:col-span-3">
          <ImageWithOverlay src={dataUrl} highlights={result.highlights} verdict={result.verdict} />
        </div>

        {/* Verdict panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Main verdict */}
          <div className={cn('rounded-2xl border p-5 flex flex-col gap-4', cfg.bg, cfg.border)}>
            <div className="flex items-center gap-3">
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center', cfg.bg)}>
                <Icon className={cn('w-6 h-6', cfg.color)} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analysis Verdict</p>
                <p className={cn('text-xl font-bold', cfg.color)}>{cfg.label}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-400">Risk Level</p>
                <p className={cn('text-sm font-bold', cfg.color)}>{result.riskLevel}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-400">Confidence</p>
                <p className={cn('text-sm font-bold', cfg.color)}>{result.confidence}%</p>
              </div>
            </div>

            <div>
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <div className={cn('h-full rounded-full transition-all duration-700', cfg.bar)} style={{ width: `${result.confidence}%` }} />
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Crosshair className="w-4 h-4 text-slate-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Detection Insights</p>
            </div>
            <ul className="space-y-2.5">
              {result.insights.map((ins, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={cn('mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center', cfg.bg)}>
                    <Icon className={cn('w-2.5 h-2.5', cfg.color)} />
                  </span>
                  <span className="text-sm text-slate-600">{ins}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold hover:bg-emerald-100 transition-colors border border-emerald-100">
          <BookmarkCheck className="w-4 h-4" /> Mark as Safe
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors border border-red-100">
          <Flag className="w-4 h-4" /> Report Scam
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
          <Save className="w-4 h-4" /> Save Result
        </button>
        <button onClick={onReset} className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0967F7]/10 text-[#0967F7] text-sm font-semibold hover:bg-[#0967F7]/15 transition-colors">
          <RotateCcw className="w-4 h-4" /> Analyze Another
        </button>
      </div>
    </div>
  );
}

/* ── Scan history ─────────────────────────────────────── */
function AnalysisHistory({ entries }: { entries: HistoryEntry[] }) {
  if (!entries.length) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <p className="text-sm font-semibold text-slate-700">Recent Analyses</p>
      </div>
      <ul className="space-y-2">
        {entries.map(e => (
          <li key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <img src={e.preview} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-100" />
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full ml-1',
              e.verdict === 'SAFE'       ? 'bg-emerald-50 text-emerald-600' :
              e.verdict === 'SUSPICIOUS' ? 'bg-amber-50 text-amber-600'   : 'bg-red-50 text-red-600'
            )}>{e.verdict}</span>
            <span className="text-xs text-slate-400 ml-auto">{e.confidence}% confidence</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */
export function ImageForensicPage() {
  const [state, setState]       = useState<AnalyzeState>('idle');
  const [progress, setProgress] = useState(0);
  const [dataUrl, setDataUrl]   = useState<string | null>(null);
  const [result, setResult]     = useState<AnalysisResult | null>(null);
  const [history, setHistory]   = useState<HistoryEntry[]>([]);

  const handleImage = async (url: string, _file: File) => {
    setDataUrl(url); setResult(null);
    setState('uploading');
    for (let p = 0; p <= 100; p += 25) {
      await new Promise(r => setTimeout(r, 60));
      setProgress(p);
    }
    setState('analyzing');
    const res = await simulateAnalysis(url);
    setResult(res);
    setState('result');
    setHistory(prev => [{ id: Date.now().toString(), preview: url, verdict: res.verdict, confidence: res.confidence }, ...prev.slice(0, 4)]);
  };

  const handleReset = () => { setState('idle'); setDataUrl(null); setResult(null); setProgress(0); };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-2xl bg-[#5969AB]/10">
              <ImageIcon className="w-5 h-5 text-[#5969AB]" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Image Forensic Analysis</h1>
          </div>
          <p className="text-sm text-slate-400 ml-14">Upload or paste an image to detect scams or manipulation</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          {state === 'idle'      && <UploadArea onImage={handleImage} />}
          {state === 'uploading' && <UploadingState progress={progress} />}
          {state === 'analyzing' && <AnalyzingState />}
          {state === 'result'    && dataUrl && result && <ResultPanel dataUrl={dataUrl} result={result} onReset={handleReset} />}
        </div>

        <AnalysisHistory entries={history} />
      </div>
    </DashboardLayout>
  );
}
