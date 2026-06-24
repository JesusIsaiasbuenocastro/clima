# 🌤️ WeatherNow — App de Clima en React

Aplicación de clima en tiempo real construida con **React 17 + Hooks**, consumiendo la API de **OpenWeatherMap**. Diseño glassmorphism con fondos dinámicos que reaccionan a las condiciones climáticas.

> Proyecto de práctica frontend para portafolio de desarrollador backend.

---

##  Publicación en NetliFy

https://clima-cea24d.netlify.app/

--

## 📸 Características

| Feature | Descripción |
|---|---|
| 🎨 Fondo dinámico | El gradiente cambia según el clima (lluvia, despejado, tormenta…) |
| 🌡️ Toggle °C / °F | Conversión de temperatura sin refetch |
| 📍 Ciudades rápidas | Acceso rápido a 8 ciudades populares |
| 🕐 Pronóstico por horas | Siguiente 5 intervalos de 3h desde OWM |
| 💧 Stats completos | Humedad, viento, visibilidad, presión, amanecer/atardecer |
| 🌐 13 países | Lista ampliada desde el original (7 → 13 + más) |
| 💨 Animaciones ambientales | Gotas de lluvia, estrellas, brillo solar según condición |
| ⚠️ Manejo de errores | Mensajes claros con botón "Intentar de nuevo" |

---

## 🏗️ Estructura del proyecto (nueva)

```
clima/
├── public/
│   └── index.html
└── src/
    ├── App.js                         ← Raíz: layout, orquestación de estado
    ├── index.js                       ← Punto de entrada React
    ├── index.css                      ← Reset global mínimo
    │
    ├── hooks/
    │   └── useWeather.js              ← Custom hook: toda la lógica de API
    │
    ├── utils/
    │   └── weather.js                 ← Conversiones, temas, constantes
    │
    └── components/
        ├── weather/                   ← Componentes específicos del dominio
        │   ├── SearchForm.js          ← Input ciudad + selector país + chips rápidos
        │   ├── WeatherCard.js         ← Temperatura principal + stats grid
        │   └── ForecastStrip.js       ← Pronóstico próximas horas
        └── ui/                        ← Componentes de interfaz reutilizables
            ├── WeatherBackground.js   ← Fondo animado dinámico
            └── ErrorMessage.js        ← Alerta de error con retry
```

### ¿Por qué esta estructura?

La estructura original tenía todos los componentes mezclados en `src/Components/` sin distinción de responsabilidad. La nueva separa:

- `hooks/` → lógica y efectos secundarios (fetching, estado derivado)
- `utils/` → funciones puras sin React (conversiones, configuración)
- `components/weather/` → componentes acoplados al dominio del clima
- `components/ui/` → componentes genéricos y reutilizables

---

## 🔄 Arquitectura y flujo de datos

```
┌──────────────────────────────────────────────────────────────────────┐
│                            App.js                                    │
│                                                                      │
│   const { weather, forecast, loading, error,                         │
│           fetchWeather, clearWeather } = useWeather()                │
│                                                                      │
│   const theme = getWeatherTheme(conditionId, isDaytime)              │
│       ↓ gradient, accent, emoji                                      │
│                                                                      │
│   ┌─────────────────┐      ┌──────────────────────────────────┐     │
│   │  WeatherBackground│    │     Glass card container          │     │
│   │  (position:fixed) │    │                                   │     │
│   │                   │    │  if !weather:                     │     │
│   │  gradient[]       │    │    <SearchForm onSearch={fetch}>  │     │
│   │  conditionId      │    │    <ErrorMessage>                 │     │
│   │                   │    │                                   │     │
│   │  → rain drops     │    │  if weather:                      │     │
│   │  → stars          │    │    <WeatherCard>                  │     │
│   │  → sun glow       │    │    <ForecastStrip>                │     │
│   └─────────────────┘      └──────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
```

### Flujo de una búsqueda

```
Usuario escribe ciudad + elige país
            │
            ▼
SearchForm.handleSubmit()
            │
            ├── ¿Campos vacíos? ──► error local (sin llamada a API)
            │
            ▼
onSearch({ ciudad, pais })   [prop callback]
            │
            ▼
useWeather.fetchWeather()
            │
            ▼
Promise.all([
  GET /weather?q={ciudad},{pais}&appid=...    ← condición actual
  GET /forecast?q={ciudad},{pais}&cnt=5       ← próximas 5 rondas de 3h
])
            │
            ├── cod === 404? ──► guardarError("Ciudad no encontrada")
            │
            ▼
setWeather(data) + setForecast(data)
            │
            ▼
App re-renderiza → getWeatherTheme(conditionId)
            │
            ▼
WeatherBackground cambia gradiente (transition: 1.2s)
WeatherCard muestra datos
ForecastStrip muestra próximas horas
```

---

## 📦 Librerías y hooks utilizados

### React `^16.13.1` (compatible con 17+)

| Hook | Dónde | Para qué |
|---|---|---|
| `useState` | `useWeather`, `SearchForm`, `WeatherCard` | Estado local de cada capa |
| `useEffect` | (eliminado de App.js) | Movido al custom hook |
| `useCallback` | `App.js`, `useWeather.js` | Evitar re-creación de funciones en cada render |

### PropTypes
Validación de props en tiempo de desarrollo. En producción se elimina del bundle. Alternativa moderna: **TypeScript** (ver mejoras sugeridas).

### OpenWeatherMap API v2.5
Dos endpoints en uso:

```
GET /weather  → condición actual (temperatura, humedad, viento, etc.)
GET /forecast → pronóstico cada 3h por 5 días (usamos primeros 5 registros)
```

Ambas llamadas se hacen en paralelo con `Promise.all()` para reducir latencia.

### Create React App (react-scripts `^5.0.1`)
Toolchain base. Incluye Webpack, Babel, ESLint y Jest sin configuración.

---

## 🎨 Sistema de diseño: tema dinámico

El archivo `utils/weather.js` exporta `getWeatherTheme(conditionId, isDaytime)` que retorna:

```js
{
  emoji: '🌧️',
  label: 'Lluvia',
  gradient: ['#1c3144', '#1a3a4a', '#2d6a8a'],  // 3 stops para CSS gradient
  accent: '#4fc3f7',                              // color de acento para botones/stats
  textClass: 'light'
}
```

Los IDs de condición de OWM siguen un esquema numérico:

| Rango | Condición | Tema |
|---|---|---|
| 200–299 | Tormenta eléctrica | Oscuro, acento rojo |
| 300–599 | Lluvia/Llovizna | Azul marino |
| 600–699 | Nieve | Celeste claro |
| 700–799 | Atmósfera (niebla) | Gris |
| 800 (día) | Cielo despejado | Naranja/azul |
| 800 (noche) | Noche despejada | Azul muy oscuro, estrellas |
| 801–804 | Nublado | Gris azulado |

---

## 🚀 Instalación

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/weathernow.git
cd weathernow

# 2. Instalar dependencias
npm install

# 3. Crear variables de entorno (IMPORTANTE antes de commit)
echo "REACT_APP_OWM_KEY=tu_api_key_aqui" > .env
# Luego en useWeather.js: const API_KEY = process.env.REACT_APP_OWM_KEY;

# 4. Correr en desarrollo
npm start

# 5. Build de producción
npm run build
```

> ⚠️ Obtén tu API key gratuita en [openweathermap.org/api](https://openweathermap.org/api). El plan Free permite 60 llamadas/minuto.

---

## 💡 Ideas para mejorar y publicar en portafolio

### Técnicas (impacto en empleabilidad)

**TypeScript** — Migrar de PropTypes a TS interfaces:
```ts
interface WeatherData {
  name: string;
  main: { temp: number; humidity: number; pressure: number; feels_like: number; temp_min: number; temp_max: number };
  wind: { speed: number };
  weather: Array<{ id: number; description: string }>;
  sys: { country: string; sunrise: number; sunset: number };
  visibility: number;
}
```
Esto demuestra que, como backend, ya conoces el tipado — y en frontend es igual de valorado.

**Variables de entorno** — La API key no debe vivir en el código:
```js
// .env
REACT_APP_OWM_KEY=tu_key

// useWeather.js
const API_KEY = process.env.REACT_APP_OWM_KEY;
```

**Custom Hook con caché** — Guarda la última búsqueda en `sessionStorage` para no repetir llamadas al recargar:
```js
const cached = sessionStorage.getItem(`weather_${ciudad}_${pais}`);
if (cached) { setWeather(JSON.parse(cached)); return; }
```

**useReducer** — Si el estado crece, reemplaza los múltiples `useState` en `useWeather` por un reducer con estados `idle | loading | success | error`.

### Funcionalidades nuevas

- **Geolocalización** — `navigator.geolocation.getCurrentPosition()` para detectar ciudad automáticamente al abrir la app
- **Historial de búsquedas** — Lista de las últimas 5 ciudades en `localStorage`
- **Modo mapa** — Integración con Leaflet.js para ver el radar de lluvia de OWM en un mapa
- **Comparador** — Ver el clima de 2 ciudades lado a lado
- **Notificaciones** — `Notification API` del navegador para alertar si hay tormenta en tu ciudad guardada
- **PWA** — Activar el Service Worker que ya viene en el proyecto y agregar `manifest.json` con íconos; la app quedará instalable en móvil

### Para el portafolio específicamente

- Despliega en **Vercel** (0 configuración con CRA) y agrega el link al README
- Agrega un **screenshot/GIF** del fondo cambiando con diferentes climas en el README
- Escribe un párrafo corto explicando el **problema que resuelves** (no solo "app del clima")
- Menciona el **reto técnico** que resolviste: coordinar dos llamadas paralelas a la API, tema dinámico basado en condiciones, etc.

---

## 🗂️ Comparación: antes vs después

| Aspecto | Original | Rediseño |
|---|---|---|
| UI Framework | Materialize CSS | CSS-in-JS nativo |
| Estructura | `/Components/` plano | `weather/` + `ui/` + `hooks/` + `utils/` |
| Lógica de API | Inline en `useEffect` de App.js | Custom hook `useWeather` |
| Llamadas a API | 1 (solo clima actual) | 2 en paralelo (clima + pronóstico) |
| Temperatura | Solo °C | Toggle °C / °F |
| Países | 7 | 18 |
| Estados UI | Error básico | Loading, error con retry, vacío, resultado |
| Animaciones | Ninguna | Fondo dinámico, gotas de lluvia, estrellas |
| Tema | Azul fijo (Materialize) | Dinámico según condición climática |

---

