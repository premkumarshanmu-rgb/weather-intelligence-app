import React from 'react';
import { Sparkles, Compass, AlertCircle } from 'lucide-react';

interface WeatherSummaryBannerProps {
  summary: string;
  cityName: string;
}

export const WeatherSummaryBanner: React.FC<WeatherSummaryBannerProps> = ({ summary, cityName }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 text-slate-100 shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Weather Intelligence Overview • {cityName}
            </h2>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium pt-1">
            {summary}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-sky-300 flex items-center gap-1.5 whitespace-nowrap">
            <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" />
            Live Open-Meteo Feed
          </div>
        </div>
      </div>
    </div>
  );
};
