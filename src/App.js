import React, { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { getWeatherTheme } from './utils/weather';
import SearchForm from './components/weather/SearchForm';
import WeatherCard from './components/weather/WeatherCard';
import ForecastStrip from './components/weather/ForecastStrip';
import ErrorMessage from './components/ui/ErrorMessage';
import WeatherBackground from './components/ui/WeatherBackground';

function App() {
  const { weather, forecast, loading, error, fetchWeather, clearWeather } = useWeather();
  const [unit, setUnit] = useState('C');
  const [lastSearch, setLastSearch] = useState(null);

  const handleSearch = useCallback((params) => {
    setLastSearch(params);
    fetchWeather(params);
  }, [fetchWeather]);

  const handleRetry = useCallback(() => {
    if (lastSearch) fetchWeather(lastSearch);
  }, [lastSearch, fetchWeather]);

  // Derive theme from current weather
  const conditionId = weather?.weather?.[0]?.id;
  const isDaytime = weather
    ? (Date.now() / 1000 > weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset)
    : true;
  const theme = conditionId ? getWeatherTheme(conditionId, isDaytime) : null;

  const hasResult = weather && !error;

  return (
    <div style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#fff',
    }}>
      {/* Dynamic animated background */}
      <WeatherBackground
        gradient={theme?.gradient}
        conditionId={conditionId}
      />

      {/* Main layout */}
      <div style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '24px 16px',
      }}>
        {/* Glass card container */}
        <div style={{
          width: '100%', maxWidth: 460,
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '28px 28px 24px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 28 }}>🌤️</span>
              <div>
                <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>
                  WeatherNow
                </h1>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5 }}>
                  Clima en tiempo real
                </p>
              </div>
            </div>
            {hasResult && (
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.08)',
                padding: '4px 10px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}
              </div>
            )}
          </div>

          {/* Content: SearchForm or WeatherCard depending on state */}
          {!hasResult ? (
            <>
              <SearchForm
                onSearch={handleSearch}
                loading={loading}
                accent={theme?.accent || '#f9a825'}
              />
              {error && (
                <div style={{ marginTop: 16 }}>
                  <ErrorMessage mensaje={error} onRetry={handleRetry} />
                </div>
              )}
              {/* Loading skeleton */}
              {loading && (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block', width: 36, height: 36,
                    border: '3px solid rgba(255,255,255,0.15)',
                    borderTopColor: '#f9a825',
                    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                  }}/>
                  <p style={{ margin: '10px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                    Consultando OpenWeatherMap...
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <WeatherCard
                weather={weather}
                onReset={clearWeather}
                unit={unit}
                onUnitChange={setUnit}
                accent={theme?.accent}
              />
              <ForecastStrip
                forecast={forecast}
                unit={unit}
                accent={theme?.accent}
              />
              {/* Search again */}
              <button
                onClick={clearWeather}
                style={{
                  marginTop: 20, width: '100%', padding: '11px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                🔍 Buscar otra ciudad
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <p style={{ marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          Datos por{' '}
          <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            OpenWeatherMap
          </a>
          {' '}· WeatherNow — React + Hooks
        </p>
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        *{box-sizing:border-box}
        ::placeholder{color:rgba(255,255,255,0.4)!important}
        select option{background:#1a1a3e;color:#fff}
      `}</style>
    </div>
  );
}

export default App;
