import React from 'react';

export default function ProjectPanel() {
  return (
    <div style={{ padding: '12px', height: '100%' }}>
      <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '8px' }}>
        Project Assets
      </div>
      <div style={{ fontSize: '14px' }}>
        📁 Assets
        <div style={{ marginLeft: '16px', fontSize: '13px', color: '#ccc' }}>
          📄 sprite1.png
          <br />
          📄 music.ogg
          <br />
          📁 Scripts
        </div>
      </div>
    </div>
  );
}