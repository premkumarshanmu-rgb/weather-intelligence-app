import React, { useState, useEffect, useCallback } from 'react';
import { LocationItem, OpenMeteoResponse, UnitSettings } from './types/weather';
import { getCityFromCoords, getWeatherForecast } from './services/openMeteo';
import { calculateActivityRecommendations, generateWeatherSummary } from './utils/weatherUtils';
import { Header, POPULAR_CITIES } from './components/Header';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecastChart } from './components/HourlyForecastChart';
import { WeeklyForecast } from './components/WeeklyForecast';
import { ActivityRecommendations } from './components/ActivityRecommendations';
import { WeatherSummaryBanner } from './components/WeatherSummaryBanner';
import { ErrorState } from './components/ErrorState';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Compass, CloudSun, Heart, ExternalLink } from 'lucide-react';

// Default starting city if no geolocation or saved city
const DEFAULT_CITY: LocationItem = POPULAR_CITIES[2]; // New York

export default function App() {
  const [location, setLocation] = useState<LocationItem>(() => {
    try {
      const saved = localStorage.getItem('wi_last_location');
      return saved ? JSON.parse(saved) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  const [forecast, setForecast] = useState<OpenMeteoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isGeoLoading, setIsGeoLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Unit settings state
  const [units, setUnits] = useState<UnitSettings>(() => {
    try {
      const saved = localStorage.getItem('wi_unit_settings');
      return saved ? JSON.parse(saved) : { temp: 'C', wind: 'kmh', pressure: 'hPa' };
    } catch {
      return { temp: 'C', wind: 'kmh', pressure: 'hPa' };
    }
  });

  // Saved Favorite Cities
  const [favorites, setFavorites] = useState<LocationItem[]>(() => {
    try {
      const saved = localStorage.getItem('wi_favorites');
      return saved ? JSON.parse(saved) : [POPULAR_CITIES[0], POPULAR_CITIES[1], POPULAR_CITIES[2]];
    } catch {
      return [POPULAR_CITIES[0], POPULAR_CITIES[1], POPULAR_CITIES[2]];
    }
  });

  // Save units & location persistence
  useEffect(() => {
    try {
      localStorage.setItem('wi_unit_settings', JSON.stringify(units));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [units]);

  useEffect(() => {
    try {
      localStorage.setItem('wi_last_location', JSON.stringify(location));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [location]);

  useEffect(() => {
    try {
      localStorage.setItem('wi_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [favorites]);

  // Main weather loader
  const loadWeatherData = useCallback(async (loc: LocationItem, isSilentRefresh = false) => {
    if (!isSilentRefresh) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const data = await getWeatherForecast(loc.latitude, loc.longitude);
      setForecast(data);
    } catch (err: any) {
      console.error('Failed to load forecast:', err);
      setError(err.message || 'Unable to retrieve weather forecast for this location.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Fetch when location changes
  useEffect(() => {
    loadWeatherData(location);
  }, [location, loadWeatherData]);

  // Geolocation Handler
  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsGeoLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const loc = await getCityFromCoords(lat, lon);
          setLocation(loc);
        } catch (err: any) {
          setError('Failed to resolve city for your GPS location.');
        } finally {
          setIsGeoLoading(false);
        }
      },
      (err) => {
        setIsGeoLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location access was denied. You can search for your city manually above.');
        } else {
          setError('Could not retrieve GPS coordinates. Please search manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Toggle favorite
  const handleToggleFavorite = (loc: LocationItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.name.toLowerCase() === loc.name.toLowerCase());
      if (exists) {
        return prev.filter((f) => f.name.toLowerCase() !== loc.name.toLowerCase());
      } else {
        return [...prev, loc];
      }
    });
  };

  // Toggle units
  const handleToggleTempUnit = () => {
    setUnits((prev) => ({
      ...prev,
      temp: prev.temp === 'C' ? 'F' : 'C'
    }));
  };

  const handleToggleWindUnit = () => {
    setUnits((prev) => ({
      ...prev,
      wind: prev.wind === 'kmh' ? 'mph' : prev.wind === 'mph' ? 'ms' : 'kmh'
    }));
  };

  // Calculations derived from current forecast
  const currentData = forecast?.current;
  const hourlyData = forecast?.hourly;
  const dailyData = forecast?.daily;

  const activityRecs = currentData
    ? calculateActivityRecommendations(
        currentData.temperature_2m,
        currentData.weather_code,
        currentData.wind_speed_10m,
        hourlyData?.precipitation_probability?.[0] ?? 0,
        currentData.cloud_cover,
        dailyData?.uv_index_max?.[0] ?? 0,
        currentData.is_day,
        hourlyData
      )
    : [];

  const weatherSummary = currentData
    ? generateWeatherSummary(
        location.name,
        currentData.temperature_2m,
        currentData.weather_code,
        dailyData,
        units
      )
    : '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      
      <div>
        {/* Top Header */}
        <Header
          currentLocation={location}
          onSelectLocation={setLocation}
          onUseGeolocation={handleUseGeolocation}
          isGeoLoading={isGeoLoading}
          units={units}
          onToggleTempUnit={handleToggleTempUnit}
          onToggleWindUnit={handleToggleWindUnit}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onRefresh={() => loadWeatherData(location, true)}
          isRefreshing={isRefreshing}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          
          {/* Error View */}
          {error && !isLoading && (
            <ErrorState
              message={error}
              onRetry={() => loadWeatherData(location)}
              onSelectPopular={setLocation}
            />
          )}

          {/* Loading View */}
          {isLoading && <LoadingSkeleton />}

          {/* Content View */}
          {!isLoading && !error && currentData && (
            <div className="space-y-6 animate-in fade-in duration-500">
              
              {/* Current Weather Card & Grid */}
              <CurrentWeather
                location={location}
                current={currentData}
                daily={dailyData}
                units={units}
                timezone={forecast?.timezone}
              />

              {/* Weather Summary Banner */}
              <WeatherSummaryBanner
                summary={weatherSummary}
                cityName={location.name}
              />

              {/* 24-Hour Temperature & Metric Chart */}
              <HourlyForecastChart
                hourly={hourlyData}
                units={units}
              />

              {/* 7-Day Forecast Cards */}
              <WeeklyForecast
                daily={dailyData}
                units={units}
              />

              {/* Activity Recommendations */}
              <ActivityRecommendations
                recommendations={activityRecs}
                cityName={location.name}
              />

            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950/80 text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-slate-400">Weather Intelligence</span>
            <span>— Powered by</span>
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-0.5"
            >
              Open-Meteo API <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-500">
            Real-time geocoding, 7-day forecast cards & activity suitabilities
          </div>
        </div>
      </footer>

    </div>
  );
}
