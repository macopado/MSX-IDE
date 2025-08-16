import React from 'react';

export default function GameView() {
  return (
    <div style={{ padding: '12px', height: '100%', background: '#3a3a3a' }}>
      <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '8px' }}>
        Game View
      </div>
      <canvas 
        width={320} 
        height={240} 
        style={{ 
          border: '1px solid #555', 
          background: '#000',
          marginTop: '8px',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
}