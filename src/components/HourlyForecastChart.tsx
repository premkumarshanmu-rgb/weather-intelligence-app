import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { HourlyForecast, UnitSettings } from '../types/weather';
import { convertTemp, convertWind, getWeatherConditionInfo } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Thermometer, CloudRain, Wind, Sun, Clock } from 'lucide-react';

interface HourlyForecastChartProps {
  hourly?: HourlyForecast;
  units: UnitSettings;
}

type MetricType = 'temp' | 'rain' | 'wind' | 'uv';

export const HourlyForecastChart: React.FC<HourlyForecastChartProps> = ({ hourly, units }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('temp');

  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  // Format first 24 hours of data
  const chartData = hourly.time.slice(0, 24).map((timeStr, idx) => {
    const date = new Date(timeStr);
    const hourLabel = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });

    const rawTemp = hourly.temperature_2m[idx];
    const displayTemp = convertTemp(rawTemp, units.temp);

    const rawWind = hourly.wind_speed_10m[idx];
    const windInfo = convertWind(rawWind, units.wind);

    const rainProb = hourly.precipitation_probability ? hourly.precipitation_probability[idx] : 0;
    const uv = hourly.uv_index ? hourly.uv_index[idx] : 0;
    const code = hourly.weather_code ? hourly.weather_code[idx] : 0;

    return {
      hour: hourLabel,
      rawTime: timeStr,
      temp: displayTemp,
      rawTemp,
      rainProb,
      windSpeed: windInfo.value,
      windUnit: windInfo.unitLabel,
      uv,
      code,
      condInfo: getWeatherConditionInfo(code)
    };
  });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs text-slate-100 space-y-1.5 min-w-[150px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1 font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {data.hour}
            </span>
            <WeatherIcon code={data.code} className="w-4 h-4" />
          </div>

          <div className="text-slate-300 font-medium">{data.condInfo.label}</div>

          <div className="space-y-1 pt-1 text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Temperature:</span>
              <span className="font-bold text-amber-400">{data.temp}°{units.temp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rain Prob:</span>
              <span className="font-bold text-sky-400">{data.rainProb}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Wind:</span>
              <span className="font-bold text-teal-400">{data.windSpeed} {data.windUnit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">UV Index:</span>
              <span className="font-bold text-amber-300">{data.uv.toFixed(1)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-6 text-slate-100 shadow-xl space-y-5">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-400" />
            24-Hour Weather Trend
          </h2>
          <p className="text-xs text-slate-400">Interactive hourly forecast metrics & probability breakdown</p>
        </div>

        {/* Metric Switcher */}
        <div className="flex flex-wrap items-center bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveMetric('temp')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
              activeMetric === 'temp'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Temp (°{units.temp})
          </button>

          <button
            onClick={() => setActiveMetric('rain')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
              activeMetric === 'rain'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Rain (%)
          </button>

          <button
            onClick={() => setActiveMetric('wind')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
              activeMetric === 'wind'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Wind
          </button>

          <button
            onClick={() => setActiveMetric('uv')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
              activeMetric === 'uv'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            UV
          </button>
        </div>
      </div>

      {/* Hourly Icon Row Slider */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar border-b border-slate-800/80">
        {chartData.map((item) => (
          <div
            key={item.rawTime}
            className="flex flex-col items-center min-w-[56px] p-2 rounded-2xl bg-slate-800/40 hover:bg-slate-800 transition border border-slate-800/60"
          >
            <span className="text-[11px] font-medium text-slate-400">{item.hour}</span>
            <div className="my-1.5">
              <WeatherIcon code={item.code} className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-300">{item.temp}°</span>
            {item.rainProb > 0 && (
              <span className="text-[10px] text-sky-400 font-semibold">{item.rainProb}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Recharts Render Area */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === 'temp' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
            </AreaChart>
          ) : activeMetric === 'rain' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rainProb" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : activeMetric === 'wind' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="windSpeed"
                stroke="#14b8a6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#windGradient)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 12]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#a855f7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#uvGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

    </div>
  );
};
