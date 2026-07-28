import React from 'react';
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Sun,
  Sunrise,
  Sunset,
  Eye,
  ArrowUp,
  ArrowDown,
  Navigation,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { CurrentWeather as CurrentWeatherType, DailyForecast, LocationItem, UnitSettings } from '../types/weather';
import {
  convertPressure,
  convertWind,
  formatTemp,
  getHumidityDescription,
  getUVDescription,
  getWeatherConditionInfo,
  getWindDirectionName
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  location: LocationItem;
  current: CurrentWeatherType;
  daily?: DailyForecast;
  units: UnitSettings;
  timezone?: string;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  location,
  current,
  daily,
  units,
  timezone
}) => {
  const cond = getWeatherConditionInfo(current.weather_code);

  const mainTemp = formatTemp(current.temperature_2m, units.temp);
  const feelsLike = formatTemp(current.apparent_temperature, units.temp);

  const maxTemp = daily?.temperature_2m_max?.[0] !== undefined
    ? formatTemp(daily.temperature_2m_max[0], units.temp)
    : '--';
  const minTemp = daily?.temperature_2m_min?.[0] !== undefined
    ? formatTemp(daily.temperature_2m_min[0], units.temp)
    : '--';

  const windInfo = convertWind(current.wind_speed_10m, units.wind);
  const windGustInfo = current.wind_gusts_10m ? convertWind(current.wind_gusts_10m, units.wind) : null;
  const windDirName = getWindDirectionName(current.wind_direction_10m);

  const pressureInfo = convertPressure(current.pressure_msl || current.surface_pressure, units.pressure);

  const uvVal = daily?.uv_index_max?.[0] ?? 0;
  const uvDesc = getUVDescription(uvVal);

  const humidityDesc = getHumidityDescription(current.relative_humidity_2m);

  // Format local sunrise / sunset
  const formatTimeStr = (isoTimeStr?: string) => {
    if (!isoTimeStr) return '--:--';
    try {
      const date = new Date(isoTimeStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return '--:--';
    }
  };

  const sunriseTime = formatTimeStr(daily?.sunrise?.[0]);
  const sunsetTime = formatTimeStr(daily?.sunset?.[0]);

  // Current formatted date/time
  const formattedNow = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      
      {/* Hero Weather Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${cond.bgGradient} text-white shadow-2xl border border-white/20 transition-all duration-500`}>
        
        {/* Subtle background glow effect */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Main Temp & Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-xs font-semibold tracking-wide text-white/90 border border-white/20 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                {location.name}
                {location.country ? `, ${location.country}` : ''}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-mono text-white/80">
                {formattedNow}
              </span>
            </div>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-md">
                {mainTemp}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white/90">
                  <WeatherIcon code={current.weather_code} className="w-6 h-6" />
                  <span>{cond.label}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 max-w-xs font-medium">
                  {cond.description}
                </p>
              </div>
            </div>

            {/* High/Low & Feels Like */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium pt-2 text-white/90">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>Feels like <strong>{feelsLike}</strong></span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <span className="flex items-center gap-1 text-emerald-300">
                  <ArrowUp className="w-3.5 h-3.5" /> High: <strong>{maxTemp}</strong>
                </span>
                <span className="w-px h-3 bg-white/20" />
                <span className="flex items-center gap-1 text-sky-200">
                  <ArrowDown className="w-3.5 h-3.5" /> Low: <strong>{minTemp}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Large Animated Weather Condition Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 self-start lg:self-center">
            <WeatherIcon code={current.weather_code} className="w-24 h-24 drop-shadow-xl" />
            <span className="mt-2 text-xs font-bold uppercase tracking-wider text-white/90">
              {current.is_day ? 'Daytime' : 'Night time'}
            </span>
          </div>

        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Humidity Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Humidity</span>
            <Droplets className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold">{current.relative_humidity_2m}%</div>
          <p className="text-[11px] text-sky-400 font-medium mt-1">{humidityDesc}</p>
        </div>

        {/* Wind Speed Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Wind</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{windInfo.value}</span>
            <span className="text-xs text-slate-400">{windInfo.unitLabel}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <Navigation
              className="w-3 h-3 text-teal-400"
              style={{ transform: `rotate(${current.wind_direction_10m}deg)` }}
            />
            <span>{windDirName} ({current.wind_direction_10m}°)</span>
          </div>
        </div>

        {/* UV Index Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">UV Index</span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold">{uvVal.toFixed(1)}</div>
          <p className={`text-[11px] font-semibold mt-1 ${uvDesc.color}`}>
            {uvDesc.level}
          </p>
        </div>

        {/* Pressure Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Pressure</span>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{pressureInfo.value}</span>
            <span className="text-xs text-slate-400">{pressureInfo.unitLabel}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Mean Sea Level</p>
        </div>

        {/* Cloud Cover Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Clouds</span>
            <Sparkles className="w-4 h-4 text-sky-300" />
          </div>
          <div className="text-2xl font-bold">{current.cloud_cover}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Sky Cover</p>
        </div>

        {/* Sunrise / Sunset Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-sm hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Sun Cycle</span>
            <Sunrise className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xs space-y-1 font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rise</span>
              <span className="text-amber-300">{sunriseTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Set</span>
              <span className="text-orange-400">{sunsetTime}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
