export const kelvinToCelsius = (k) => parseFloat((k - 273.15).toFixed(1));
export const kelvinToFahrenheit = (k) => parseFloat(((k - 273.15) * 9/5 + 32).toFixed(1));

export const mpsToKmh = (mps) => Math.round(mps * 3.6);

export const formatHour = (timestamp) => {
  const d = new Date(timestamp * 1000);
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (timestamp) => {
  const d = new Date(timestamp * 1000);
  return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
};

// Returns a config { emoji, label, gradient, accent } based on weather condition id
export const getWeatherTheme = (conditionId, isDaytime) => {
  if (conditionId >= 200 && conditionId < 300) {
    return {
      emoji: '⛈️',
      label: 'Tormenta',
      gradient: ['#1a1a2e', '#16213e', '#0f3460'],
      accent: '#e94560',
      textClass: 'light',
    };
  }
  if (conditionId >= 300 && conditionId < 600) {
    return {
      emoji: '🌧️',
      label: 'Lluvia',
      gradient: ['#1c3144', '#1a3a4a', '#2d6a8a'],
      accent: '#4fc3f7',
      textClass: 'light',
    };
  }
  if (conditionId >= 600 && conditionId < 700) {
    return {
      emoji: '❄️',
      label: 'Nieve',
      gradient: ['#e8f4f8', '#d0e9f5', '#b8dff0'],
      accent: '#1565c0',
      textClass: 'dark',
    };
  }
  if (conditionId >= 700 && conditionId < 800) {
    return {
      emoji: '🌫️',
      label: 'Neblina',
      gradient: ['#c9d6df', '#b0bec5', '#90a4ae'],
      accent: '#455a64',
      textClass: 'dark',
    };
  }
  if (conditionId === 800) {
    if (isDaytime) {
      return {
        emoji: '☀️',
        label: 'Despejado',
        gradient: ['#0f4c75', '#1b6ca8', '#e55d2b'],
        accent: '#f9a825',
        textClass: 'light',
      };
    }
    return {
      emoji: '🌙',
      label: 'Noche despejada',
      gradient: ['#0d0d1a', '#111132', '#1a1a4a'],
      accent: '#c5cae9',
      textClass: 'light',
    };
  }
  if (conditionId > 800) {
    return {
      emoji: '⛅',
      label: 'Nublado',
      gradient: ['#2c3e50', '#3d5166', '#546e7a'],
      accent: '#b0bec5',
      textClass: 'light',
    };
  }
  return {
    emoji: '🌡️',
    label: 'Clima',
    gradient: ['#1565c0', '#1976d2', '#42a5f5'],
    accent: '#fff9c4',
    textClass: 'light',
  };
};

export const COUNTRIES = [
  { code: '', label: '— Selecciona un país —' },
  { code: 'MX', label: '🇲🇽 México' },
  { code: 'US', label: '🇺🇸 Estados Unidos' },
  { code: 'AR', label: '🇦🇷 Argentina' },
  { code: 'CO', label: '🇨🇴 Colombia' },
  { code: 'CR', label: '🇨🇷 Costa Rica' },
  { code: 'ES', label: '🇪🇸 España' },
  { code: 'PE', label: '🇵🇪 Perú' },
  { code: 'CL', label: '🇨🇱 Chile' },
  { code: 'VE', label: '🇻🇪 Venezuela' },
  { code: 'EC', label: '🇪🇨 Ecuador' },
  { code: 'GT', label: '🇬🇹 Guatemala' },
  { code: 'BR', label: '🇧🇷 Brasil' },
  { code: 'CA', label: '🇨🇦 Canadá' },
  { code: 'GB', label: '🇬🇧 Reino Unido' },
  { code: 'FR', label: '🇫🇷 Francia' },
  { code: 'DE', label: '🇩🇪 Alemania' },
  { code: 'JP', label: '🇯🇵 Japón' },
];

export const QUICK_CITIES = [
  { ciudad: 'Ciudad de México', pais: 'MX' },
  { ciudad: 'Guadalajara', pais: 'MX' },
  { ciudad: 'Monterrey', pais: 'MX' },
  { ciudad: 'Buenos Aires', pais: 'AR' },
  { ciudad: 'Bogotá', pais: 'CO' },
  { ciudad: 'Madrid', pais: 'ES' },
  { ciudad: 'New York', pais: 'US' },
  { ciudad: 'Tokyo', pais: 'JP' },
];
