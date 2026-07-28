import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, RefreshCw, Compass, AlertCircle, Sparkles } from 'lucide-react';
import { GeocodingResult, LocationItem, UnitSettings } from '../types/weather';
import { searchCity } from '../services/openMeteo';

interface HeaderProps {
  currentLocation: LocationItem;
  onSelectLocation: (loc: LocationItem) => void;
  onUseGeolocation: () => void;
  isGeoLoading: boolean;
  units: UnitSettings;
  onToggleTempUnit: () => void;
  onToggleWindUnit: () => void;
  favorites: LocationItem[];
  onToggleFavorite: (loc: LocationItem) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

// Popular default cities for instant quick picks
export const POPULAR_CITIES: LocationItem[] = [
  { id: '1850147', name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.6917 },
  { id: '2643743', name: 'London', country: 'United Kingdom', latitude: 51.5085, longitude: -0.1257 },
  { id: '5128581', name: 'New York', country: 'United States', admin1: 'New York', latitude: 40.7143, longitude: -74.006 },
  { id: '2988507', name: 'Paris', country: 'France', latitude: 48.8534, longitude: 2.3488 },
  { id: '2147714', name: 'Sydney', country: 'Australia', latitude: -33.8678, longitude: 151.2073 },
  { id: '360630', name: 'Cairo', country: 'Egypt', latitude: 30.0626, longitude: 31.2497 },
  { id: '5391959', name: 'San Francisco', country: 'United States', admin1: 'California', latitude: 37.7749, longitude: -122.4194 }
];

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectLocation,
  onUseGeolocation,
  isGeoLoading,
  units,
  onToggleTempUnit,
  onToggleWindUnit,
  favorites,
  onToggleFavorite,
  onRefresh,
  isRefreshing
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isCurrentFavorite = favorites.some(f => f.name.toLowerCase() === currentLocation.name.toLowerCase());

  // Debounced autocomplete search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const data = await searchCity(query);
        setResults(data);
        if (data.length === 0) {
          setSearchError('No matching cities found. Check spelling.');
        }
      } catch (err: any) {
        setSearchError('Failed to search cities. Please check network.');
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (res: GeocodingResult) => {
    onSelectLocation({
      id: String(res.id),
      name: res.name,
      country: res.country,
      admin1: res.admin1,
      latitude: res.latitude,
      longitude: res.longitude,
      timezone: res.timezone
    });
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 shadow-md shadow-sky-500/20 text-white flex items-center justify-center">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent flex items-center gap-2">
                  Weather Intelligence
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    Live
                  </span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Open-Meteo forecasts, hourly metrics & smart activity insights
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onToggleTempUnit}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition"
              >
                °{units.temp}
              </button>
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search Bar & Auto-complete */}
          <div className="relative flex-1 max-w-xl" ref={dropdownRef}>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search city (e.g. Tokyo, London, Paris, New York)..."
                className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-900 text-slate-100 placeholder-slate-400 rounded-2xl border border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition shadow-inner"
              />
              
              <button
                type="button"
                onClick={onUseGeolocation}
                disabled={isGeoLoading}
                title="Use current GPS location"
                className="absolute right-2 px-3 py-1.5 text-xs font-medium text-sky-400 hover:text-white bg-slate-700/60 hover:bg-sky-600 rounded-xl transition flex items-center gap-1.5 border border-slate-600/50"
              >
                <MapPin className={`w-3.5 h-3.5 ${isGeoLoading ? 'animate-bounce text-sky-300' : ''}`} />
                <span className="hidden sm:inline">{isGeoLoading ? 'Locating...' : 'GPS'}</span>
              </button>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60">
                
                {/* Search Loading State */}
                {isSearching && (
                  <div className="p-4 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                    Searching Open-Meteo Geocoding API...
                  </div>
                )}

                {/* Search Error State */}
                {!isSearching && searchError && (
                  <div className="p-3.5 text-xs text-rose-400 bg-rose-500/10 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{searchError}</span>
                  </div>
                )}

                {/* Search Results */}
                {!isSearching && results.length > 0 && (
                  <div className="max-h-64 overflow-y-auto py-1">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Search Results
                    </div>
                    {results.map((res) => (
                      <button
                        key={`${res.id}-${res.latitude}-${res.longitude}`}
                        onClick={() => handleSelectCity(res)}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                          <div>
                            <span className="text-sm font-medium text-slate-200 group-hover:text-sky-300">
                              {res.name}
                            </span>
                            <span className="text-xs text-slate-400 ml-1.5">
                              {[res.admin1, res.country].filter(Boolean).join(', ')}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {res.latitude.toFixed(2)}°, {res.longitude.toFixed(2)}°
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Cities Suggestions */}
                {(!query.trim() || query.length < 2) && (
                  <div className="p-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Popular Cities
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_CITIES.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => {
                            onSelectLocation(city);
                            setShowDropdown(false);
                          }}
                          className="px-3 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-sky-600/30 hover:text-sky-300 border border-slate-700/80 text-slate-300 transition flex items-center gap-1"
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls: Unit Toggles, Favorite Toggle, Refresh */}
          <div className="hidden md:flex items-center gap-3">
            {/* Save / Pin Favorite */}
            <button
              onClick={() => onToggleFavorite(currentLocation)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
                isCurrentFavorite
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isCurrentFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              {isCurrentFavorite ? 'Saved' : 'Pin City'}
            </button>

            {/* Temperature Unit Toggle */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={onToggleTempUnit}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  units.temp === 'C' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                onClick={onToggleTempUnit}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  units.temp === 'F' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                °F
              </button>
            </div>

            {/* Wind Unit Toggle */}
            <button
              onClick={onToggleWindUnit}
              className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Toggle Wind Speed Unit"
            >
              {units.wind}
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition disabled:opacity-50"
              title="Refresh Forecast Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>

        </div>

        {/* Favorites Bar (Horizontal Quick Chips) */}
        {favorites.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium flex-shrink-0">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Favorites:
            </span>
            <div className="flex items-center gap-1.5">
              {favorites.map((fav) => (
                <button
                  key={fav.id || fav.name}
                  onClick={() => onSelectLocation(fav)}
                  className={`px-2.5 py-1 text-xs rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
                    fav.name.toLowerCase() === currentLocation.name.toLowerCase()
                      ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-semibold'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/60'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-sky-400" />
                  {fav.name}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
