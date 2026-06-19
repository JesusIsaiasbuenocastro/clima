import React from 'react';
import PropTypes from 'prop-types';
import { kelvinToCelsius, kelvinToFahrenheit, getWeatherTheme } from '../../utils/weather';

const ForecastStrip = ({ forecast, unit, accent }) => {
  if (!forecast || !forecast.list) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <p style={{
        margin: '0 0 10px', fontSize: 11, color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase', letterSpacing: 1
      }}>
        Próximas horas
      </p>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {forecast.list.map((item, i) => {
          const isDaytime = true; // simplified for forecast
          const theme = getWeatherTheme(item.weather[0].id, isDaytime);
          const temp = unit === 'C' ? kelvinToCelsius(item.main.temp) : kelvinToFahrenheit(item.main.temp);
          const hour = new Date(item.dt * 1000).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={i} style={{
              flexShrink: 0, background: 'rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '12px 16px', textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.12)', minWidth: 72,
            }}>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{hour}</p>
              <p style={{ margin: '6px 0', fontSize: 22 }}>{theme.emoji}</p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: accent }}>{temp}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ForecastStrip.propTypes = {
  forecast: PropTypes.object,
  unit: PropTypes.string,
  accent: PropTypes.string,
};

ForecastStrip.defaultProps = { unit: 'C' };

export default ForecastStrip;
