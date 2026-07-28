import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudSunRain,
  CloudLightning,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Sunrise,
  Sunset,
  Sparkles,
  Zap
} from 'lucide-react';

interface WeatherIconProps {
  code?: number;
  iconName?: string;
  className?: string;
  animate?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  iconName,
  className = 'w-6 h-6',
  animate = true
}) => {
  // Map weather code directly if code provided
  if (code !== undefined) {
    switch (code) {
      case 0:
        return <Sun className={`${className} ${animate ? 'animate-[spin_12s_linear_infinite] text-amber-400' : 'text-amber-400'}`} />;
      case 1:
        return <SunMedium className={`${className} text-amber-400`} />;
      case 2:
        return <CloudSun className={`${className} text-sky-300`} />;
      case 3:
        return <Cloud className={`${className} text-slate-300`} />;
      case 45:
      case 48:
        return <CloudFog className={`${className} text-slate-400`} />;
      case 51:
      case 53:
      case 55:
        return <CloudDrizzle className={`${className} text-sky-400`} />;
      case 56:
      case 57:
      case 66:
      case 67:
        return <Snowflake className={`${className} text-cyan-300`} />;
      case 61:
      case 63:
      case 65:
        return <CloudRain className={`${className} text-blue-400`} />;
      case 71:
      case 73:
      case 75:
      case 77:
        return <Snowflake className={`${className} ${animate ? 'animate-bounce text-sky-200' : 'text-sky-200'}`} />;
      case 80:
      case 81:
      case 82:
        return <CloudSunRain className={`${className} text-sky-400`} />;
      case 85:
      case 86:
        return <Snowflake className={`${className} text-cyan-200`} />;
      case 95:
      case 96:
      case 99:
        return <CloudLightning className={`${className} ${animate ? 'animate-pulse text-purple-400' : 'text-purple-400'}`} />;
      default:
        return <CloudSun className={`${className} text-sky-300`} />;
    }
  }

  // Fallback map by name
  switch (iconName) {
    case 'Sun': return <Sun className={`${className} text-amber-400`} />;
    case 'SunMedium': return <SunMedium className={`${className} text-amber-400`} />;
    case 'CloudSun': return <CloudSun className={`${className} text-sky-300`} />;
    case 'Cloud': return <Cloud className={`${className} text-slate-300`} />;
    case 'CloudFog': return <CloudFog className={`${className} text-slate-400`} />;
    case 'CloudDrizzle': return <CloudDrizzle className={`${className} text-sky-400`} />;
    case 'CloudRain': return <CloudRain className={`${className} text-blue-400`} />;
    case 'CloudRainWind': return <CloudRainWind className={`${className} text-blue-500`} />;
    case 'Snowflake': return <Snowflake className={`${className} text-cyan-200`} />;
    case 'CloudSunRain': return <CloudSunRain className={`${className} text-sky-400`} />;
    case 'CloudLightning': return <CloudLightning className={`${className} text-purple-400`} />;
    case 'Droplets': return <Droplets className={`${className} text-sky-400`} />;
    case 'Wind': return <Wind className={`${className} text-teal-400`} />;
    case 'Gauge': return <Gauge className={`${className} text-amber-400`} />;
    case 'Thermometer': return <Thermometer className={`${className} text-rose-400`} />;
    case 'Sunrise': return <Sunrise className={`${className} text-amber-300`} />;
    case 'Sunset': return <Sunset className={`${className} text-orange-400`} />;
    case 'Eye': return <Eye className={`${className} text-emerald-400`} />;
    case 'Sparkles': return <Sparkles className={`${className} text-amber-300`} />;
    default: return <CloudSun className={`${className} text-sky-300`} />;
  }
};
