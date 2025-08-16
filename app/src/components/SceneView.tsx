import React from 'react';

export default function SceneView() {
  return (
    <div style={{ padding: '12px', height: '100%', background: '#3a3a3a' }}>
      <h3>Scene View</h3>
      <canvas 
        width={300} 
        height={200} 
        style={{ 
          border: '1px solid #555', 
          background: '#2a2a2a',
          marginTop: '8px' 
        }}
      />
    </div>
  );
}