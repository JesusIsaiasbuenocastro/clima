import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { COUNTRIES, QUICK_CITIES } from '../../utils/weather';

const SearchForm = ({ onSearch, loading, accent }) => {
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais]     = useState('');
  const [error, setError]   = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ciudad.trim() || !pais.trim()) {
      setError('Por favor ingresa una ciudad y selecciona un país.');
      return;
    }
    setError('');
    onSearch({ ciudad: ciudad.trim(), pais });
  };

  const handleQuick = ({ ciudad: c, pais: p }) => {
    setCiudad(c);
    setPais(p);
    setError('');
    onSearch({ ciudad: c, pais: p });
  };

  const accentColor = accent || '#f9a825';

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* City input */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 18, pointerEvents: 'none', opacity: 0.6
          }}>🏙️</span>
          <input
            type="text"
            placeholder="Ciudad..."
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '13px 16px 13px 44px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 12, color: '#fff',
              fontSize: 15, outline: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
          />
        </div>

        {/* Country select */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 18, pointerEvents: 'none', opacity: 0.6
          }}>🌎</span>
          <select
            value={pais}
            onChange={e => setPais(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '13px 16px 13px 44px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 12, color: pais ? '#fff' : 'rgba(255,255,255,0.5)',
              fontSize: 15, outline: 'none', cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              appearance: 'none', fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code} style={{ background: '#1a1a3e', color: '#fff' }}>
                {c.label}
              </option>
            ))}
          </select>
          <span style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'rgba(255,255,255,0.5)', pointerEvents: 'none', fontSize: 12
          }}>▼</span>
        </div>

        {/* Error */}
        {error && (
          <p style={{
            margin: 0, fontSize: 13, color: '#ff8a80',
            background: 'rgba(255,80,80,0.12)', borderRadius: 8,
            padding: '8px 12px', border: '1px solid rgba(255,80,80,0.25)'
          }}>⚠️ {error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px', borderRadius: 12, border: 'none',
            background: accentColor, color: '#000',
            fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.1s',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8
          }}
          onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {loading ? (
            <>
              <span style={{
                display: 'inline-block', width: 16, height: 16,
                border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000',
                borderRadius: '50%', animation: 'spin 0.7s linear infinite'
              }}/>
              Consultando...
            </>
          ) : '🔍 Consultar clima'}
        </button>
      </form>

      {/* Quick cities */}
      <div style={{ marginTop: 20 }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
          Ciudades rápidas
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {QUICK_CITIES.map(q => (
            <button
              key={q.ciudad}
              onClick={() => handleQuick(q)}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 20, padding: '5px 12px', fontSize: 12,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              {q.ciudad}
            </button>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  accent: PropTypes.string,
};

export default SearchForm;
