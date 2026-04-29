import React, { useState } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { useEducationArticles } from '../../hooks/useDashboardData';
import { Loader2, BookOpen, Shield, AlertTriangle, Download, Eye, Lock, ArrowRight, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { EducationArticle } from '../../api/mockData';

const categoryIcons: Record<string, React.ElementType> = {
  'Phishing': AlertTriangle,
  'Malware': Shield,
  'Social Engineering': Eye,
  'Downloads': Download,
  'Privacy': Lock,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  'Phishing': { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', iconBg: 'bg-red-100' },
  'Malware': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', iconBg: 'bg-purple-100' },
  'Social Engineering': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', iconBg: 'bg-amber-100' },
  'Downloads': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', iconBg: 'bg-blue-100' },
  'Privacy': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
};

const difficultyColors: Record<string, string> = {
  'Beginner': 'text-emerald-600 bg-emerald-50 border-emerald-100',
  'Intermediate': 'text-amber-600 bg-amber-50 border-amber-100',
  'Advanced': 'text-red-600 bg-red-50 border-red-100',
};

export function EducationPage() {
  const { data: articles, isLoading } = useEducationArticles();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = ['ALL', 'Phishing', 'Malware', 'Social Engineering', 'Downloads', 'Privacy'];

  const filteredArticles = articles?.filter(article => {
    const matchesCategory = filterCategory === 'ALL' || article.category === filterCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Hero Card */}
        <div className="relative bg-gradient-to-br from-[#0967F7] to-[#082051] rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-white/60" />
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Security Academy</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Stay Informed, Stay Safe</h2>
            <p className="text-sm text-white/60 max-w-lg leading-relaxed">
              Learn about the latest scams, malware techniques, and online threats.
              Knowledge is your first line of defense.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex-1 focus-within:border-[#0967F7]/30 focus-within:ring-2 focus-within:ring-[#0967F7]/10 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
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

        {/* Articles Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}

            {filteredArticles.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
                <BookOpen className="w-10 h-10 mb-3 text-slate-300" />
                <p className="text-sm font-medium">No articles found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function ArticleCard({ article }: { article: EducationArticle }) {
  const colors = categoryColors[article.category] || categoryColors['Phishing'];
  const Icon = categoryIcons[article.category] || Shield;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col">
      {/* Card Header with colored top */}
      <div className={cn('px-6 pt-6 pb-4')}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn('p-2.5 rounded-xl', colors.iconBg)}>
            <Icon className={cn('w-5 h-5', colors.text)} />
          </div>
          <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-full border', difficultyColors[article.difficulty])}>
            {article.difficulty}
          </span>
        </div>

        <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-3 inline-block', colors.bg, colors.text)}>
          {article.category}
        </span>

        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0967F7] transition-colors">
          {article.title}
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {article.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">{article.readTime}</span>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0967F7] hover:text-[#082051] transition-colors group/btn">
          Learn more
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
