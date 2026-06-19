import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { kelvinToCelsius, kelvinToFahrenheit, mpsToKmh, formatHour, getWeatherTheme } from '../../utils/weather';

const StatPill = ({ icon, label, value, accent }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)', borderRadius: 14,
    padding: '14px 16px', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.15)',
    display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 120px',
    minWidth: 110,
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</span>
    <span style={{ fontSize: 16, fontWeight: 700, color: accent || '#fff' }}>{value}</span>
  </div>
);

const WeatherCard = ({ weather, onReset }) => {
  const [unit, setUnit] = useState('C');

  if (!weather || !weather.main) return null;

  const { name, main, weather: conditions, wind, sys, visibility } = weather;
  const condition = conditions[0];
  const now = Date.now() / 1000;
  const isDaytime = now > sys.sunrise && now < sys.sunset;
  const theme = getWeatherTheme(condition.id, isDaytime);

  const tempMain  = unit === 'C' ? kelvinToCelsius(main.temp) : kelvinToFahrenheit(main.temp);
  const tempMax   = unit === 'C' ? kelvinToCelsius(main.temp_max) : kelvinToFahrenheit(main.temp_max);
  const tempMin   = unit === 'C' ? kelvinToCelsius(main.temp_min) : kelvinToFahrenheit(main.temp_min);
  const tempFeel  = unit === 'C' ? kelvinToCelsius(main.feels_like) : kelvinToFahrenheit(main.feels_like);
  const unitLabel = unit === 'C' ? '°C' : '°F';

  return (
    <div style={{ width: '100%', animation: 'fadeUp 0.5s ease both' }}>
      {/* City name + condition */}
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
            {name}, <span style={{ fontWeight: 400, fontSize: 20 }}>{sys.country}</span>
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.65)', textTransform: 'capitalize' }}>
            {theme.emoji} {condition.description}
          </p>
        </div>
        <button
          onClick={onReset}
          title="Nueva búsqueda"
          style={{
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
            fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >✕</button>
      </div>

      {/* Main temperature */}
      <div style={{ textAlign: 'center', padding: '20px 0 16px', position: 'relative' }}>
        <div style={{
          fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -4,
          textShadow: `0 0 60px ${theme.accent}55`,
        }}>
          {tempMain}
          <span style={{ fontSize: 36, fontWeight: 400, verticalAlign: 'super', marginLeft: 4 }}>
            {unitLabel}
          </span>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
          <span>↑ {tempMax}{unitLabel}</span>
          <span>↓ {tempMin}{unitLabel}</span>
          <span>Sensación {tempFeel}{unitLabel}</span>
        </div>

        {/* Unit toggle */}
        <div style={{
          display: 'inline-flex', marginTop: 14, background: 'rgba(0,0,0,0.25)',
          borderRadius: 20, padding: 3, gap: 2
        }}>
          {['C', 'F'].map(u => (
            <button key={u} onClick={() => setUnit(u)} style={{
              padding: '5px 16px', borderRadius: 17, border: 'none', cursor: 'pointer',
              background: unit === u ? theme.accent : 'transparent',
              color: unit === u ? '#000' : 'rgba(255,255,255,0.6)',
              fontWeight: unit === u ? 700 : 400, fontSize: 13,
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}>°{u}</button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <StatPill icon="💧" label="Humedad" value={`${main.humidity}%`} accent={theme.accent} />
        <StatPill icon="💨" label="Viento" value={`${mpsToKmh(wind.speed)} km/h`} accent={theme.accent} />
        <StatPill icon="👁️" label="Visibilidad" value={`${(visibility / 1000).toFixed(1)} km`} accent={theme.accent} />
        <StatPill icon="🌡️" label="Presión" value={`${main.pressure} hPa`} accent={theme.accent} />
        <StatPill icon="🌅" label="Amanecer" value={formatHour(sys.sunrise)} accent={theme.accent} />
        <StatPill icon="🌇" label="Atardecer" value={formatHour(sys.sunset)} accent={theme.accent} />
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.object,
  onReset: PropTypes.func.isRequired,
};

export default WeatherCard;
