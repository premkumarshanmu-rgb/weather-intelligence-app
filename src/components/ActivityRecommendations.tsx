import React, { useState } from 'react';
import { ActivityRecommendation } from '../types/weather';
import {
  Sparkles,
  Footprints,
  Bike,
  Trees,
  Utensils,
  Camera,
  Waves,
  Wind,
  Snowflake,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';

interface ActivityRecommendationsProps {
  recommendations: ActivityRecommendation[];
  cityName: string;
}

export const ActivityRecommendations: React.FC<ActivityRecommendationsProps> = ({
  recommendations,
  cityName
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalActivity, setActiveModalActivity] = useState<ActivityRecommendation | null>(null);

  const categories = ['All', 'Sports', 'Outdoor', 'Leisure', 'Indoor', 'Water'];

  const filtered = selectedCategory === 'All'
    ? recommendations
    : recommendations.filter(a => a.category === selectedCategory);

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'Bike': return <Bike className="w-5 h-5 text-sky-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-teal-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-yellow-300" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-300" />;
      case 'Snowflake': return <Snowflake className="w-5 h-5 text-sky-200" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const getStatusBadge = (status: ActivityRecommendation['status']) => {
    switch (status) {
      case 'Ideal':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ideal
          </span>
        );
      case 'Good':
        return (
          <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Good
          </span>
        );
      case 'Moderate':
        return (
          <span className="px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 text-xs font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Moderate
          </span>
        );
      case 'Unfavorable':
        return (
          <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 text-xs font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Unfavorable
          </span>
        );
      case 'Avoid':
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 text-xs font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Avoid
          </span>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400';
    if (score >= 60) return 'from-sky-500 to-blue-400';
    if (score >= 40) return 'from-yellow-500 to-amber-400';
    if (score >= 20) return 'from-orange-500 to-amber-600';
    return 'from-rose-600 to-red-500';
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-6 text-slate-100 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Smart Activity Intelligence
          </h2>
          <p className="text-xs text-slate-400">Weather-adapted activity suitabilities for {cityName}</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((act) => (
          <div
            key={act.id}
            onClick={() => setActiveModalActivity(act)}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 transition-all duration-300 shadow-sm cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div>
              {/* Title & Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:scale-105 transition-transform">
                    {getActivityIcon(act.icon)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {act.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">{act.category}</span>
                  </div>
                </div>

                {getStatusBadge(act.status)}
              </div>

              {/* Progress Bar Score */}
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Suitability Index</span>
                  <span className="font-extrabold text-white">{act.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/40">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreColor(act.score)} transition-all duration-500 rounded-full`}
                    style={{ width: `${act.score}%` }}
                  />
                </div>
              </div>

              {/* Reason */}
              <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                {act.reason}
              </p>
            </div>

            {/* Bottom Window & Tip trigger */}
            <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1 font-medium text-sky-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Window: {act.bestTimeWindow || 'Today'}</span>
              </div>
              <span className="text-slate-400 group-hover:text-sky-400 flex items-center font-medium text-[11px]">
                Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Activity Detail Modal / Panel */}
      {activeModalActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-slate-100 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700">
                  {getActivityIcon(activeModalActivity.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeModalActivity.name}</h3>
                  <span className="text-xs text-slate-400">{activeModalActivity.category} Activity</span>
                </div>
              </div>

              {getStatusBadge(activeModalActivity.status)}
            </div>

            {/* Score gauge */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Weather Suitability Rating</span>
                <span className="text-amber-400 text-sm font-extrabold">{activeModalActivity.score}/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(activeModalActivity.score)} rounded-full`}
                  style={{ width: `${activeModalActivity.score}%` }}
                />
              </div>
            </div>

            {/* Reasoning */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-sky-400" /> Weather Analysis
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                {activeModalActivity.reason}
              </p>
            </div>

            {/* Time window */}
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400 font-medium">Best Recommended Hours:</span>
              <span className="font-bold text-sky-300">{activeModalActivity.bestTimeWindow}</span>
            </div>

            {/* Pro Tips */}
            {activeModalActivity.tips.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Actionable Recommendations & Safety Tips
                </span>
                <ul className="space-y-1.5">
                  {activeModalActivity.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setActiveModalActivity(null)}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-xs text-white transition shadow-lg shadow-sky-600/20"
            >
              Done / Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
