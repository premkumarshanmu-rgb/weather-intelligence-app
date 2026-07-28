import React, { useState } from 'react';
import { DailyForecast, UnitSettings } from '../types/weather';
import {
  convertTemp,
  convertWind,
  formatTemp,
  getUVDescription,
  getWeatherConditionInfo
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Umbrella
} from 'lucide-react';

interface WeeklyForecastProps {
  daily?: DailyForecast;
  units: UnitSettings;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ daily, units }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  // Calculate overall weekly min and max temp for spectrum range scaling
  const allMaxTemps = daily.temperature_2m_max.map(t => convertTemp(t, units.temp));
  const allMinTemps = daily.temperature_2m_min.map(t => convertTemp(t, units.temp));
  const globalMax = Math.max(...allMaxTemps);
  const globalMin = Math.min(...allMinTemps);
  const rangeSpan = Math.max(1, globalMax - globalMin);

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-6 text-slate-100 shadow-xl space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-400" />
            7-Day Forecast Cards
          </h2>
          <p className="text-xs text-slate-400">Detailed daily outlook with temperature spectrums</p>
        </div>
      </div>

      {/* Daily Cards List */}
      <div className="space-y-2.5">
        {daily.time.slice(0, 7).map((dateStr, index) => {
          const dateObj = new Date(dateStr + 'T00:00:00');
          const isToday = index === 0;

          const dayName = isToday
            ? 'Today'
            : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const fullDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          const code = daily.weather_code[index];
          const cond = getWeatherConditionInfo(code);

          const maxT = convertTemp(daily.temperature_2m_max[index], units.temp);
          const minT = convertTemp(daily.temperature_2m_min[index], units.temp);

          const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[index] : 0;
          const rainSum = daily.precipitation_sum ? daily.precipitation_sum[index] : 0;
          const uvMax = daily.uv_index_max ? daily.uv_index_max[index] : 0;
          const windMax = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[index] : 0;
          const windInfo = convertWind(windMax, units.wind);

          const isExpanded = expandedIndex === index;

          // Temperature range bar percentages
          const leftPercent = Math.max(0, Math.min(100, ((minT - globalMin) / rangeSpan) * 100));
          const widthPercent = Math.max(8, Math.min(100, ((maxT - minT) / rangeSpan) * 100));

          return (
            <div
              key={dateStr}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isToday
                  ? 'bg-slate-800/80 border-sky-500/40 shadow-lg shadow-sky-500/5'
                  : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800'
              }`}
            >
              
              {/* Card Bar */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                
                {/* Day & Date & Icon */}
                <div className="flex items-center gap-3 min-w-[170px]">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center">
                    <WeatherIcon code={code} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{dayName}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          Today
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{fullDate} • {cond.label}</span>
                  </div>
                </div>

                {/* Rain Probability Pill */}
                <div className="flex items-center gap-2 text-xs font-semibold min-w-[90px]">
                  <Droplets className={`w-3.5 h-3.5 ${rainProb > 40 ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className={rainProb > 40 ? 'text-sky-300' : 'text-slate-400'}>
                    {rainProb}% rain
                  </span>
                </div>

                {/* Temperature Spectrum Bar */}
                <div className="flex items-center gap-3 flex-1 max-w-xs">
                  <span className="text-xs font-bold text-slate-400 w-8 text-right">{minT}°</span>
                  
                  <div className="relative flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    />
                  </div>

                  <span className="text-xs font-bold text-white w-8">{maxT}°</span>
                </div>

                {/* Chevron expand */}
                <div className="text-slate-400 hover:text-white flex items-center justify-end">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4" />}
                </div>

              </div>

              {/* Expanded Details Panel */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1 font-medium">
                      <Umbrella className="w-3.5 h-3.5 text-sky-400" /> Precipitation
                    </div>
                    <div className="font-bold text-slate-200">{rainSum.toFixed(1)} mm</div>
                    <div className="text-[10px] text-slate-400">{rainProb}% max probability</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1 font-medium">
                      <Wind className="w-3.5 h-3.5 text-teal-400" /> Max Wind
                    </div>
                    <div className="font-bold text-slate-200">{windInfo.value} {windInfo.unitLabel}</div>
                    <div className="text-[10px] text-slate-400">Dominant direction</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1 font-medium">
                      <Sun className="w-3.5 h-3.5 text-amber-400" /> Max UV Index
                    </div>
                    <div className="font-bold text-slate-200">{uvMax.toFixed(1)}</div>
                    <div className="text-[10px] text-amber-400 font-semibold">{getUVDescription(uvMax).level}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400 flex items-center gap-1 font-medium">
                      <Sunrise className="w-3.5 h-3.5 text-amber-300" /> Sun Cycle
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300">
                      Rise: {daily.sunrise[index] ? new Date(daily.sunrise[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300">
                      Set: {daily.sunset[index] ? new Date(daily.sunset[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
