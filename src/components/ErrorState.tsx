import React from 'react';
import { AlertTriangle, RefreshCw, Search, MapPin } from 'lucide-react';
import { LocationItem } from '../types/weather';
import { POPULAR_CITIES } from './Header';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onSelectPopular: (city: LocationItem) => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  onSelectPopular
}) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-extrabold text-white">Weather Data Unavailable</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">{message}</p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-sky-600/20"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>

      <div className="pt-6 border-t border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Or Select a Popular Global Destination:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_CITIES.slice(0, 6).map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectPopular(city)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-sky-400" />
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
