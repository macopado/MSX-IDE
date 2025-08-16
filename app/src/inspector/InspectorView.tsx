import React from 'react';

export default function InspectorView() {
  return (
    <div style={{ padding: '12px', height: '100%' }}>
      <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '8px' }}>
        Inspector
      </div>
      <div style={{ fontSize: '14px', marginBottom: '12px' }}>
        No object selected
      </div>
      <div style={{ fontSize: '12px', color: '#888' }}>
        Select an object to view its properties
      </div>
    </div>
  );
}