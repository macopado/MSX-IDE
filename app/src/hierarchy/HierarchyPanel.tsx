import React from 'react';

export default function HierarchyPanel() {
  return (
    <div style={{ padding: '12px', height: '100%' }}>
      <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '8px' }}>
        Scene Objects
      </div>
      <div style={{ fontSize: '14px' }}>
        • Scene Root
        <div style={{ marginLeft: '16px', fontSize: '13px', color: '#ccc' }}>
          • GameObject 1
          <br />
          • GameObject 2
        </div>
      </div>
    </div>
  );
}