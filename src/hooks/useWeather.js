import { useState, useCallback } from 'react';

const API_KEY = process.env.REACT_APP_APIKEY_WEATHER;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weather, setWeather]   = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchWeather = useCallback(async ({ ciudad, pais }) => {
    if (!ciudad.trim() || !pais.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(ciudad)},${pais}&appid=${API_KEY}&lang=es`),
        fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(ciudad)},${pais}&appid=${API_KEY}&lang=es&cnt=5`)
      ]);

      const weatherData  = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (weatherData.cod === '404' || weatherData.cod === 401) {
        setError('Ciudad no encontrada. Verifica el nombre e intenta de nuevo.');
        setWeather(null);
        setForecast(null);
      } else {
        setWeather(weatherData);
        setForecast(forecastData);
        setError(null);
      }
    } catch {
      setError('Error de conexión. Revisa tu internet e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeather(null);
    setForecast(null);
    setError(null);
  }, []);

  return { weather, forecast, loading, error, fetchWeather, clearWeather };
};
