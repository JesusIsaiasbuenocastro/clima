import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ mensaje, onRetry }) => (
  <div style={{
    background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)',
    borderRadius: 16, padding: '24px 20px', textAlign: 'center',
    animation: 'fadeUp 0.4s ease both',
  }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>😶‍🌫️</div>
    <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 15 }}>{mensaje}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff', borderRadius: 20, padding: '8px 20px',
          cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
        }}
      >
        Intentar de nuevo
      </button>
    )}
    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </div>
);

ErrorMessage.propTypes = {
  mensaje: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
