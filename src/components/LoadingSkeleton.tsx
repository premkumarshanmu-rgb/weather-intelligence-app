import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero card skeleton */}
      <div className="h-64 rounded-3xl bg-slate-800/80 border border-slate-700/50 p-8 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="w-48 h-6 bg-slate-700/80 rounded-xl" />
          <div className="w-32 h-16 bg-slate-700/80 rounded-2xl" />
        </div>
        <div className="flex gap-4">
          <div className="w-32 h-8 bg-slate-700/80 rounded-xl" />
          <div className="w-40 h-8 bg-slate-700/80 rounded-xl" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-800/80 border border-slate-700/50 p-4 space-y-3">
            <div className="w-20 h-4 bg-slate-700/80 rounded" />
            <div className="w-16 h-8 bg-slate-700/80 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="h-72 rounded-3xl bg-slate-800/80 border border-slate-700/50 p-6 space-y-4">
        <div className="w-56 h-6 bg-slate-700/80 rounded-lg" />
        <div className="w-full h-48 bg-slate-700/40 rounded-2xl" />
      </div>

      {/* Weekly cards skeleton */}
      <div className="h-96 rounded-3xl bg-slate-800/80 border border-slate-700/50 p-6 space-y-3">
        <div className="w-48 h-6 bg-slate-700/80 rounded-lg" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-700/40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
