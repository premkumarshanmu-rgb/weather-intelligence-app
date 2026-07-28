import { GeocodingResponse, GeocodingResult, OpenMeteoResponse } from '../types/weather';

const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_BASE = 'https://api.open-meteo.com/v1/forecast';

/**
 * Search for cities using Open-Meteo Geocoding API
 * https://geocoding-api.open-meteo.com/v1/search?name=CITY
 */
export async function searchCity(query: string): Promise<GeocodingResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `${GEOCODING_API_BASE}?name=${encodeURIComponent(trimmed)}&count=10&language=en&format=json`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Geocoding server error (${response.status})`);
    }

    const data: GeocodingResponse = await response.json();
    return data.results || [];
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Search request timed out. Please check your internet connection.');
    }
    console.error('Error fetching geocoding data:', error);
    throw error;
  }
}

/**
 * Get comprehensive forecast data from Open-Meteo Forecast API
 * https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=...&daily=...&timezone=auto
 */
export async function getWeatherForecast(lat: number, lon: number): Promise<OpenMeteoResponse> {
  const currentFields = [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weather_code',
    'cloud_cover',
    'pressure_msl',
    'surface_pressure',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m'
  ].join(',');

  const hourlyFields = [
    'temperature_2m',
    'relative_humidity_2m',
    'dew_point_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'weather_code',
    'pressure_msl',
    'cloud_cover',
    'visibility',
    'wind_speed_10m',
    'uv_index'
  ].join(',');

  const dailyFields = [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'uv_index_max',
    'precipitation_sum',
    'rain_sum',
    'showers_sum',
    'snowfall_sum',
    'precipitation_hours',
    'precipitation_probability_max',
    'wind_speed_10m_max',
    'wind_gusts_10m_max',
    'wind_direction_10m_dominant'
  ].join(',');

  const url = `${FORECAST_API_BASE}?latitude=${lat}&longitude=${lon}&current=${currentFields}&hourly=${hourlyFields}&daily=${dailyFields}&timezone=auto`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather service returned HTTP ${response.status}`);
    }

    const data: OpenMeteoResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Weather forecast request timed out. Please try again.');
    }
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

/**
 * Find city details from lat/lon reverse lookup using Geocoding API or fallback
 */
export async function getCityFromCoords(lat: number, lon: number): Promise<GeocodingResult> {
  try {
    // Open-Meteo geocoding search supports coordinates approximation in name or reverse lookup
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'WeatherIntelligenceApp/1.0' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const name = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || 'Current Location';
      const country = data.address?.country || '';
      const admin1 = data.address?.state || data.address?.region || '';

      return {
        id: Math.round(lat * 1000 + lon * 1000),
        name,
        latitude: lat,
        longitude: lon,
        country,
        admin1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
      };
    }
  } catch (err) {
    // Fallback if nominatim reverse geocode fails/times out
  }

  return {
    id: Math.round(lat * 1000 + lon * 1000),
    name: 'Your Location',
    latitude: lat,
    longitude: lon,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
  };
}
