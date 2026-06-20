import React from 'react';
import PropTypes from 'prop-types';

const WeatherBackground = ({ gradient, conditionId }) => {
  const isRainy = conditionId >= 200 && conditionId < 600;
  const isSunny = conditionId === 800;
  const isStormy = conditionId >= 200 && conditionId < 300;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      background: gradient
        ? `linear-gradient(160deg, ${gradient[0]} 0%, ${gradient[1]} 50%, ${gradient[2]} 100%)`
        : 'linear-gradient(160deg, #0f4c75 0%, #1b6ca8 50%, #e55d2b 100%)',
      transition: 'background 1.2s ease',
    }}>
      {/* Animated orbs for atmosphere */}
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)', top: -100, right: -100,
        animation: 'orb1 8s ease-in-out infinite',
      }}/>
      <div style={{
        position: 'absolute', width: 250, height: 250, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', bottom: 100, left: -80,
        animation: 'orb2 11s ease-in-out infinite',
      }}/>

      {/* Rain drops - only shown when rainy */}
      {isRainy && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 5.3) % 100}%`,
          top: `${(i * 13) % 80}%`,
          width: 1.5, height: `${18 + (i % 5) * 6}px`,
          background: 'rgba(150,210,255,0.25)',
          borderRadius: 1,
          animation: `rain ${0.7 + (i % 4) * 0.15}s linear infinite`,
          animationDelay: `${(i * 0.1) % 0.8}s`,
        }}/>
      ))}

      {/* Stars - only at night clear sky */}
      {!isSunny && !isRainy && !isStormy && Array.from({ length: 30 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 3.3) % 95}%`,
          top: `${(i * 3.1) % 70}%`,
          width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1,
          background: 'rgba(255,255,255,0.5)', borderRadius: '50%',
          animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.2) % 3}s`,
        }}/>
      ))}

      {/* Sun glow - only sunny */}
      {isSunny && (
        <div style={{
          position: 'absolute', top: 60, right: 80, width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(249,168,37,0.35) 0%, transparent 70%)',
          borderRadius: '50%', animation: 'glow 4s ease-in-out infinite',
        }}/>
      )}

      <style>{`
        @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,20px) scale(1.05)}}
        @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-30px) scale(0.95)}}
        @keyframes rain{from{transform:translateY(-20px) translateX(0)}to{transform:translateY(100vh) translateX(-5px)}}
        @keyframes twinkle{0%,100%{opacity:0.3}50%{opacity:1}}
        @keyframes glow{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.15);opacity:1}}
      `}</style>
    </div>
  );
};

WeatherBackground.propTypes = {
  gradient: PropTypes.array,
  conditionId: PropTypes.number,
};

export default WeatherBackground;
