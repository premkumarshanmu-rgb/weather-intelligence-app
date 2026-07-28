import { ActivityRecommendation, DailyForecast, HourlyForecast, UnitSettings, WeatherConditionInfo } from '../types/weather';

export const WMO_WEATHER_CODES: Record<number, WeatherConditionInfo> = {
  0: {
    label: 'Clear Sky',
    description: 'Bright sunshine and completely clear skies.',
    iconName: 'Sun',
    bgGradient: 'from-amber-400 via-sky-400 to-blue-600',
    cardBg: 'bg-gradient-to-br from-amber-500/10 via-sky-500/10 to-blue-500/10 border-amber-200/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    category: 'clear'
  },
  1: {
    label: 'Mainly Clear',
    description: 'Mostly sunny with occasional soft clouds.',
    iconName: 'SunMedium',
    bgGradient: 'from-amber-300 via-sky-400 to-blue-500',
    cardBg: 'bg-gradient-to-br from-amber-400/10 via-sky-400/10 to-blue-400/10 border-sky-200/30',
    textColor: 'text-sky-600 dark:text-sky-400',
    category: 'clear'
  },
  2: {
    label: 'Partly Cloudy',
    description: 'Scattered clouds with periods of sunshine.',
    iconName: 'CloudSun',
    bgGradient: 'from-sky-300 via-blue-400 to-slate-600',
    cardBg: 'bg-gradient-to-br from-sky-400/10 to-slate-500/10 border-sky-200/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'cloudy'
  },
  3: {
    label: 'Overcast',
    description: 'Complete cloud cover with limited direct sunlight.',
    iconName: 'Cloud',
    bgGradient: 'from-slate-400 via-slate-500 to-slate-700',
    cardBg: 'bg-gradient-to-br from-slate-400/10 to-slate-600/10 border-slate-300/30',
    textColor: 'text-slate-600 dark:text-slate-300',
    category: 'cloudy'
  },
  45: {
    label: 'Foggy',
    description: 'Reduced visibility due to mist and low fog.',
    iconName: 'CloudFog',
    bgGradient: 'from-slate-300 via-gray-400 to-slate-600',
    cardBg: 'bg-gradient-to-br from-slate-300/10 to-gray-500/10 border-slate-300/30',
    textColor: 'text-slate-500 dark:text-slate-400',
    category: 'fog'
  },
  48: {
    label: 'Depositing Rime Fog',
    description: 'Icy fog conditions with frost build-up.',
    iconName: 'CloudFog',
    bgGradient: 'from-slate-200 via-cyan-400 to-blue-600',
    cardBg: 'bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border-cyan-200/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    category: 'fog'
  },
  51: {
    label: 'Light Drizzle',
    description: 'Gentle mist and fine rain drizzle.',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-sky-400 via-slate-500 to-blue-700',
    cardBg: 'bg-gradient-to-br from-sky-400/10 to-slate-600/10 border-sky-300/30',
    textColor: 'text-sky-500 dark:text-sky-400',
    category: 'drizzle'
  },
  53: {
    label: 'Moderate Drizzle',
    description: 'Steady light drizzle throughout the area.',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-sky-500 via-slate-600 to-blue-800',
    cardBg: 'bg-gradient-to-br from-sky-500/10 to-slate-700/10 border-sky-400/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'drizzle'
  },
  55: {
    label: 'Dense Drizzle',
    description: 'Heavy drizzle dampening surfaces rapidly.',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-sky-600 via-slate-700 to-blue-900',
    cardBg: 'bg-gradient-to-br from-sky-600/10 to-slate-800/10 border-sky-400/30',
    textColor: 'text-sky-700 dark:text-sky-300',
    category: 'drizzle'
  },
  56: {
    label: 'Freezing Drizzle',
    description: 'Light freezing drizzle creating slippery conditions.',
    iconName: 'Snowflake',
    bgGradient: 'from-cyan-300 via-blue-500 to-slate-700',
    cardBg: 'bg-gradient-to-br from-cyan-300/10 to-blue-600/10 border-cyan-300/30',
    textColor: 'text-cyan-600 dark:text-cyan-300',
    category: 'drizzle'
  },
  57: {
    label: 'Dense Freezing Drizzle',
    description: 'Heavy freezing drizzle forming ice layers.',
    iconName: 'Snowflake',
    bgGradient: 'from-cyan-400 via-blue-600 to-slate-800',
    cardBg: 'bg-gradient-to-br from-cyan-400/10 to-blue-700/10 border-cyan-400/30',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    category: 'drizzle'
  },
  61: {
    label: 'Slight Rain',
    description: 'Light rainfall showers across the region.',
    iconName: 'CloudRain',
    bgGradient: 'from-sky-400 via-blue-600 to-indigo-800',
    cardBg: 'bg-gradient-to-br from-sky-400/10 to-indigo-600/10 border-sky-300/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    category: 'rain'
  },
  63: {
    label: 'Moderate Rain',
    description: 'Steady rain showers with wet road conditions.',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-500 via-indigo-600 to-slate-800',
    cardBg: 'bg-gradient-to-br from-blue-500/10 to-slate-700/10 border-blue-400/30',
    textColor: 'text-blue-600 dark:text-blue-300',
    category: 'rain'
  },
  65: {
    label: 'Heavy Rain',
    description: 'Torrential rain with high accumulation.',
    iconName: 'CloudRainWind',
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    cardBg: 'bg-gradient-to-br from-blue-700/10 to-indigo-900/10 border-blue-500/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    category: 'rain'
  },
  66: {
    label: 'Light Freezing Rain',
    description: 'Cold rain freezing upon ground contact.',
    iconName: 'CloudRain',
    bgGradient: 'from-cyan-500 via-blue-700 to-slate-900',
    cardBg: 'bg-gradient-to-br from-cyan-500/10 to-slate-800/10 border-cyan-400/30',
    textColor: 'text-cyan-600 dark:text-cyan-300',
    category: 'rain'
  },
  67: {
    label: 'Heavy Freezing Rain',
    description: 'Heavy freezing rain causing hazardous black ice.',
    iconName: 'CloudRainWind',
    bgGradient: 'from-cyan-600 via-blue-800 to-slate-950',
    cardBg: 'bg-gradient-to-br from-cyan-600/10 to-blue-900/10 border-cyan-500/30',
    textColor: 'text-cyan-700 dark:text-cyan-200',
    category: 'rain'
  },
  71: {
    label: 'Slight Snow Fall',
    description: 'Gentle flurries and light snowfall.',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-200 via-blue-300 to-slate-500',
    cardBg: 'bg-gradient-to-br from-sky-200/20 via-blue-300/10 to-slate-400/10 border-sky-200/40',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'snow'
  },
  73: {
    label: 'Moderate Snow Fall',
    description: 'Steady snow falling with white landscapes.',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-300 via-indigo-400 to-slate-600',
    cardBg: 'bg-gradient-to-br from-sky-300/10 to-slate-500/10 border-sky-300/30',
    textColor: 'text-sky-700 dark:text-sky-200',
    category: 'snow'
  },
  75: {
    label: 'Heavy Snow Fall',
    description: 'Dense snowstorm with heavy accumulation.',
    iconName: 'Snowflake',
    bgGradient: 'from-blue-300 via-indigo-500 to-slate-800',
    cardBg: 'bg-gradient-to-br from-blue-300/10 to-indigo-700/10 border-blue-300/30',
    textColor: 'text-sky-800 dark:text-sky-100',
    category: 'snow'
  },
  77: {
    label: 'Snow Grains',
    description: 'Tiny icy frozen snow grains.',
    iconName: 'Snowflake',
    bgGradient: 'from-slate-200 via-sky-300 to-blue-500',
    cardBg: 'bg-gradient-to-br from-slate-200/10 to-blue-400/10 border-sky-200/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'snow'
  },
  80: {
    label: 'Slight Rain Showers',
    description: 'Passing brief rain showers with sunny breaks.',
    iconName: 'CloudSunRain',
    bgGradient: 'from-sky-400 via-blue-500 to-slate-600',
    cardBg: 'bg-gradient-to-br from-sky-400/10 to-slate-500/10 border-sky-300/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'rain'
  },
  81: {
    label: 'Moderate Rain Showers',
    description: 'Frequent rain showers occurring throughout.',
    iconName: 'CloudSunRain',
    bgGradient: 'from-blue-400 via-indigo-600 to-slate-700',
    cardBg: 'bg-gradient-to-br from-blue-400/10 to-slate-600/10 border-blue-300/30',
    textColor: 'text-blue-600 dark:text-blue-300',
    category: 'rain'
  },
  82: {
    label: 'Violent Rain Showers',
    description: 'Sudden downpours with heavy rain gusts.',
    iconName: 'CloudRainWind',
    bgGradient: 'from-indigo-600 via-purple-700 to-slate-900',
    cardBg: 'bg-gradient-to-br from-indigo-600/10 to-slate-800/10 border-indigo-400/30',
    textColor: 'text-indigo-600 dark:text-indigo-300',
    category: 'rain'
  },
  85: {
    label: 'Slight Snow Showers',
    description: 'Brief snow showers passing through.',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-300 via-blue-400 to-slate-600',
    cardBg: 'bg-gradient-to-br from-sky-300/10 to-blue-500/10 border-sky-300/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'snow'
  },
  86: {
    label: 'Heavy Snow Showers',
    description: 'Heavy snow gusts with reduced visibility.',
    iconName: 'Snowflake',
    bgGradient: 'from-blue-400 via-indigo-600 to-slate-800',
    cardBg: 'bg-gradient-to-br from-blue-400/10 to-slate-700/10 border-blue-400/30',
    textColor: 'text-sky-700 dark:text-sky-200',
    category: 'snow'
  },
  95: {
    label: 'Thunderstorm',
    description: 'Lightning, thunder, and gusty winds.',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-600 via-slate-800 to-slate-950',
    cardBg: 'bg-gradient-to-br from-purple-600/10 via-slate-800/20 to-slate-900/30 border-purple-400/30',
    textColor: 'text-purple-600 dark:text-purple-300',
    category: 'thunderstorm'
  },
  96: {
    label: 'Thunderstorm with Hail',
    description: 'Severe storm accompanied by small hail.',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-700 via-indigo-900 to-slate-950',
    cardBg: 'bg-gradient-to-br from-purple-700/10 to-slate-900/30 border-purple-500/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    category: 'thunderstorm'
  },
  99: {
    label: 'Heavy Thunderstorm with Hail',
    description: 'Severe thunderstorm with destructive hail and high wind.',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-900 via-slate-900 to-black',
    cardBg: 'bg-gradient-to-br from-purple-900/20 to-black/30 border-purple-600/40',
    textColor: 'text-purple-800 dark:text-purple-200',
    category: 'thunderstorm'
  }
};

export function getWeatherConditionInfo(code: number): WeatherConditionInfo {
  return WMO_WEATHER_CODES[code] || {
    label: 'Variable Weather',
    description: 'Mixed atmospheric conditions.',
    iconName: 'CloudSun',
    bgGradient: 'from-sky-400 via-slate-500 to-blue-700',
    cardBg: 'bg-gradient-to-br from-sky-400/10 to-slate-600/10 border-sky-300/30',
    textColor: 'text-sky-600 dark:text-sky-300',
    category: 'cloudy'
  };
}

// Unit conversion helpers
export function convertTemp(celsius: number, unit: 'C' | 'F'): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: 'C' | 'F'): string {
  const val = convertTemp(celsius, unit);
  return `${val}°${unit}`;
}

export function convertWind(speedKmh: number, unit: UnitSettings['wind']): { value: number; unitLabel: string } {
  if (unit === 'mph') {
    return { value: Math.round(speedKmh * 0.621371), unitLabel: 'mph' };
  }
  if (unit === 'ms') {
    return { value: Math.round((speedKmh / 3.6) * 10) / 10, unitLabel: 'm/s' };
  }
  return { value: Math.round(speedKmh), unitLabel: 'km/h' };
}

export function convertPressure(hpa: number, unit: UnitSettings['pressure']): { value: number; unitLabel: string } {
  if (unit === 'inHg') {
    return { value: Math.round(hpa * 0.02953 * 100) / 100, unitLabel: 'inHg' };
  }
  return { value: Math.round(hpa), unitLabel: 'hPa' };
}

export function getWindDirectionName(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] || 'N';
}

export function getUVDescription(uvIndex: number): { level: string; color: string } {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-emerald-500 dark:text-emerald-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-500 dark:text-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-500 dark:text-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-500 dark:text-red-400' };
  return { level: 'Extreme', color: 'text-purple-600 dark:text-purple-400' };
}

export function getHumidityDescription(humidity: number): string {
  if (humidity < 30) return 'Dry & Crisp';
  if (humidity <= 60) return 'Comfortable';
  if (humidity <= 80) return 'Humid';
  return 'Very Humid';
}

// Activity Intelligence Calculator
export function calculateActivityRecommendations(
  currentTemp: number, // C
  weatherCode: number,
  windSpeed: number, // km/h
  precipitationProb: number, // %
  cloudCover: number, // %
  uvIndex: number,
  isDay: number,
  hourly?: HourlyForecast
): ActivityRecommendation[] {
  const isRainy = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode);
  const isSnowy = [71, 73, 75, 77, 85, 86].includes(weatherCode);
  const isStormy = [95, 96, 99].includes(weatherCode);

  // Helper to find best 2-3 hour window in next 24h from hourly data
  const getBestWindow = (activityType: string): string => {
    if (!hourly || !hourly.time || hourly.time.length === 0) return 'Next 3 hours';
    // Look at first 24 slots
    const nowHour = new Date().getHours();
    let bestHour = nowHour;
    let maxSubScore = -1;

    for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
      const hTime = new Date(hourly.time[i]);
      const hTemp = hourly.temperature_2m[i];
      const hRain = hourly.precipitation_probability[i];
      const hWind = hourly.wind_speed_10m[i];

      let subScore = 100 - hRain;
      if (activityType === 'running') {
        subScore -= Math.abs(hTemp - 15) * 3;
        if (hWind > 25) subScore -= 20;
      } else if (activityType === 'cycling') {
        subScore -= Math.abs(hTemp - 20) * 2;
        if (hWind > 20) subScore -= 25;
      } else if (activityType === 'outdoor_dining') {
        subScore -= Math.abs(hTemp - 22) * 4;
      }

      if (subScore > maxSubScore) {
        maxSubScore = subScore;
        bestHour = hTime.getHours();
      }
    }

    const endHour = (bestHour + 2) % 24;
    const formatH = (h: number) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formatted = h % 12 === 0 ? 12 : h % 12;
      return `${formatted} ${ampm}`;
    };
    return `${formatH(bestHour)} - ${formatH(endHour)}`;
  };

  const list: ActivityRecommendation[] = [];

  // 1. Running & Jogging
  {
    let score = 100;
    const tips: string[] = [];
    if (currentTemp < 5) { score -= 25; tips.push('Cold weather: layer up and protect hands/ears.'); }
    else if (currentTemp > 28) { score -= 35; tips.push('High heat: carry water and run early or late.'); }
    else if (currentTemp >= 12 && currentTemp <= 20) { tips.push('Optimal running temperature!'); }

    if (isRainy) { score -= 45; tips.push('Slippery conditions: wear road-grip running shoes.'); }
    if (windSpeed > 25) { score -= 20; tips.push(`Headwinds (${Math.round(windSpeed)} km/h): pace yourself.`); }
    if (uvIndex >= 7) { tips.push('High UV: apply SPF 30+ sunscreen and wear a cap.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'running',
      name: 'Running & Jogging',
      category: 'Sports',
      icon: 'Footprints',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: score >= 80 ? 'Crisp temperatures and clear path ahead.' : isRainy ? 'Rain probability makes roads slick.' : currentTemp > 28 ? 'Sweltering heat elevates fatigue.' : 'Fair running conditions.',
      bestTimeWindow: getBestWindow('running'),
      tips
    });
  }

  // 2. Cycling & Biking
  {
    let score = 100;
    const tips: string[] = [];
    if (windSpeed > 30) { score -= 50; tips.push('Strong wind gusts disrupt bike balance.'); }
    else if (windSpeed > 18) { score -= 20; tips.push('Moderate wind expected along open roads.'); }

    if (isRainy) { score -= 60; tips.push('Reduced brake traction and wet asphalt.'); }
    if (currentTemp < 8) { score -= 30; tips.push('Cold air windchill: wear windproof gear.'); }
    else if (currentTemp >= 16 && currentTemp <= 24) { tips.push('Perfect mild breeze for cycling.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'cycling',
      name: 'Cycling & Biking',
      category: 'Sports',
      icon: 'Bike',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: isRainy ? 'Wet roads reduce tire grip.' : windSpeed > 25 ? 'High crosswinds make riding challenging.' : 'Great breeze and clear riding conditions.',
      bestTimeWindow: getBestWindow('cycling'),
      tips
    });
  }

  // 3. Hiking & Nature Trail
  {
    let score = 100;
    const tips: string[] = [];
    if (isStormy) { score = 0; tips.push('DANGER: Avoid ridge trails during lightning hazard!'); }
    else if (isRainy) { score -= 50; tips.push('Muddy trails and reduced visibility.'); }

    if (currentTemp > 30) { score -= 35; tips.push('Pack extra hydration (at least 2L).'); }
    if (uvIndex >= 6) { tips.push('Bring polarized sunglasses and broad-spectrum sunscreen.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'hiking',
      name: 'Hiking & Nature Walk',
      category: 'Outdoor',
      icon: 'Trees',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: isStormy ? 'Thunderstorm risk on high elevation trails.' : isRainy ? 'Wet muddy trail surfaces.' : 'Comfortable weather for scenic outdoor treks.',
      bestTimeWindow: getBestWindow('hiking'),
      tips
    });
  }

  // 4. Outdoor Dining & Patio
  {
    let score = 100;
    const tips: string[] = [];
    if (currentTemp < 16) { score -= (16 - currentTemp) * 6; tips.push('Bring a warm jacket or seek heated patios.'); }
    else if (currentTemp > 29) { score -= (currentTemp - 29) * 5; tips.push('Seek umbrella shade or misting areas.'); }

    if (isRainy) { score -= 70; tips.push('Indoor seating recommended due to rain.'); }
    if (windSpeed > 22) { score -= 30; tips.push('Breezy conditions might affect outdoor setups.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'outdoor_dining',
      name: 'Outdoor Patio Dining',
      category: 'Leisure',
      icon: 'Utensils',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: isRainy ? 'Rain drops make outdoor seating impractical.' : currentTemp < 15 ? 'Chilly for terrace dining.' : 'Delightful ambient temperature for outdoor meals.',
      bestTimeWindow: getBestWindow('outdoor_dining'),
      tips
    });
  }

  // 5. Photography & Sightseeing
  {
    let score = 100;
    const tips: string[] = [];
    if (cloudCover > 40 && cloudCover < 85) { score += 10; tips.push('Soft cloud diffusion offers golden-hour lighting!'); }
    else if (cloudCover >= 90) { score -= 20; tips.push('Overcast flat light; focus on macro or monochrome.'); }

    if (isRainy) { score -= 40; tips.push('Protect camera gear with waterproof covers.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'photography',
      name: 'Photography & Sightseeing',
      category: 'Leisure',
      icon: 'Camera',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: cloudCover > 40 && cloudCover < 80 ? 'Dynamic cloud structures for scenic shots.' : isRainy ? 'Rain requires camera weather-sealing.' : 'Clear view for landmarks.',
      bestTimeWindow: 'Golden Hour (Sunrise / Sunset)',
      tips
    });
  }

  // 6. Stargazing & Astronomy
  {
    let score = 100;
    const tips: string[] = [];
    if (isDay === 1) {
      score = 10;
      tips.push('Daytime now: stargazing opens after twilight.');
    } else {
      if (cloudCover > 30) { score -= (cloudCover - 30) * 1.2; tips.push('Cloud cover obscures night sky visibility.'); }
      if (isRainy) { score = 0; tips.push('Rain prevents optical astronomy.'); }
    }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'stargazing',
      name: 'Stargazing & Astronomy',
      category: 'Outdoor',
      icon: 'Sparkles',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: isDay === 1 ? 'Daylight present; best after dark.' : cloudCover < 20 ? 'Crystal clear night canopy.' : 'Partial cloud obstruction.',
      bestTimeWindow: '10:00 PM - 3:00 AM',
      tips
    });
  }

  // 7. Beach, Pool & Swimming
  {
    let score = 100;
    const tips: string[] = [];
    if (currentTemp < 22) { score -= (22 - currentTemp) * 8; tips.push('Cool air temperature for water activities.'); }
    if (isRainy || isStormy) { score = 0; tips.push('Avoid open water during rain or lightning risk.'); }
    if (uvIndex >= 8) { tips.push('Extreme UV: reapply waterproof SPF every 80 mins.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'swimming',
      name: 'Beach & Swimming',
      category: 'Water',
      icon: 'Waves',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: currentTemp >= 25 && !isRainy ? 'Warm air and sunshine for beach waters.' : 'Cool temperatures or rain make swimming uncomfortable.',
      bestTimeWindow: '11:00 AM - 3:00 PM',
      tips
    });
  }

  // 8. Kite Flying & Wind Sports
  {
    let score = 100;
    const tips: string[] = [];
    if (windSpeed < 10) { score -= 40; tips.push('Light air: needs higher wind speed for lift.'); }
    else if (windSpeed >= 15 && windSpeed <= 35) { score += 15; tips.push('Steadily brisk winds for excellent kite flight!'); }
    else if (windSpeed > 45) { score -= 60; tips.push('Gale force winds may damage kites or gear.'); }

    if (isRainy) { score -= 50; tips.push('Wet lines and heavy air dampens lift.'); }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'kites',
      name: 'Kite Flying & Sailing',
      category: 'Sports',
      icon: 'Wind',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: windSpeed >= 15 && windSpeed <= 35 ? 'Strong steady breeze.' : windSpeed < 10 ? 'Insufficient breeze for lift.' : 'Extreme wind turbulence.',
      bestTimeWindow: '2:00 PM - 5:00 PM',
      tips
    });
  }

  // 9. Snow Sports & Skiing
  {
    let score = 50;
    const tips: string[] = [];
    if (isSnowy || currentTemp <= 2) {
      score = 95;
      tips.push('Cold temperatures preserve powder conditions.');
    } else {
      score = 15;
      tips.push('Warm temperatures melt resort snow base.');
    }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'snowsports',
      name: 'Skiing & Winter Sports',
      category: 'Sports',
      icon: 'Snowflake',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : score >= 20 ? 'Unfavorable' : 'Avoid',
      reason: currentTemp <= 2 ? 'Sub-freezing air holds winter snow.' : 'Temperatures above freezing.',
      bestTimeWindow: '9:00 AM - 2:00 PM',
      tips
    });
  }

  // 10. Indoor Gaming & Cafe Reading
  {
    // Inverse relationship: Perfect for rainy/cold days!
    let score = 60;
    const tips: string[] = [];
    if (isRainy || isStormy || currentTemp < 10 || currentTemp > 33) {
      score = 98;
      tips.push('Cozy weather to enjoy board games, coffee, or books inside.');
    } else {
      score = 70;
      tips.push('Nice weather outside, but always a relaxing option.');
    }

    score = Math.max(0, Math.min(100, score));
    list.push({
      id: 'indoor',
      name: 'Indoor Cafe & Board Games',
      category: 'Indoor',
      icon: 'Coffee',
      score,
      status: score >= 80 ? 'Ideal' : score >= 60 ? 'Good' : 'Moderate',
      reason: isRainy ? 'Rainy weather creates the perfect cozy indoor atmosphere!' : 'Always a cozy choice.',
      bestTimeWindow: 'Anytime',
      tips
    });
  }

  return list.sort((a, b) => b.score - a.score);
}

// Generate smart text overview
export function generateWeatherSummary(
  cityName: string,
  currentTemp: number,
  weatherCode: number,
  daily?: DailyForecast,
  units: UnitSettings = { temp: 'C', wind: 'kmh', pressure: 'hPa' }
): string {
  const cond = getWeatherConditionInfo(weatherCode);
  const tempStr = formatTemp(currentTemp, units.temp);

  if (!daily || !daily.temperature_2m_max || daily.temperature_2m_max.length === 0) {
    return `${cityName} is experiencing ${cond.label.toLowerCase()} with a current temperature of ${tempStr}.`;
  }

  const maxTemp = formatTemp(daily.temperature_2m_max[0], units.temp);
  const minTemp = formatTemp(daily.temperature_2m_min[0], units.temp);
  const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
  const uvMax = daily.uv_index_max ? daily.uv_index_max[0] : 0;

  let highlight = '';
  if (rainProb > 60) {
    highlight = `Rain is likely today (${rainProb}% chance); consider taking an umbrella.`;
  } else if (uvMax >= 7) {
    highlight = `High UV index expected (peak ${uvMax.toFixed(1)}); UV protection is recommended during midday.`;
  } else if (daily.temperature_2m_max[0] - daily.temperature_2m_min[0] > 12) {
    highlight = `Expect a notable diurnal temperature swing from a crisp ${minTemp} up to ${maxTemp}.`;
  } else {
    highlight = `Overall pleasant atmospheric stability throughout the day.`;
  }

  return `${cityName} currently features ${cond.label.toLowerCase()} at ${tempStr}, peaking at ${maxTemp} with a overnight low of ${minTemp}. ${highlight}`;
}
