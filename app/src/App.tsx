import React from 'react';
import { DockLayout, PanelConfig } from '@ui/DockLayout';
import SceneView from '@components/SceneView';
import HierarchyPanel from '@hierarchy/HierarchyPanel';
import InspectorView from '@inspector/InspectorView';
import ProjectPanel from '@project/ProjectPanel';
import GameView from '@game/GameView';
import { useStore } from '@state/store';

export default function App() {
  const status = useStore(s => s.playbackStatus);
  
  const panels: PanelConfig[] = [
    { id: 'hierarchy', title: 'Hierarchy', render: () => <HierarchyPanel /> },
    { id: 'project', title: 'Project', render: () => <ProjectPanel /> },
    { id: 'inspector', title: 'Inspector', render: () => <InspectorView /> },
    { id: 'scene', title: 'Scene', render: () => <SceneView /> },
    { id: 'game', title: 'Game', render: () => <GameView /> },
  ];

  return (
    <div className="app-root">
      <TopBar status={status} />
      <div style={{ flex: 1, padding: 8, boxSizing: 'border-box' }}>
        <DockLayout
          panels={panels}
          initialOrder={['hierarchy', 'scene', 'inspector', 'project', 'game']}
          onClosePanel={(id) => {
            // TODO: optional: hide panel / update global layout state
            console.log('close', id);
          }}
        />
      </div>
    </div>
  );
}

function TopBar({ status }: { status: 'Stopped' | 'Playing' }) {
  const setStatus = useStore(s => s.setPlaybackStatus);
  return (
    <div className="topbar">
      <div className="brand">MSX-IDE</div>
      <div className="playback">
        <button onClick={() => setStatus(status === 'Playing' ? 'Stopped' : 'Playing')}>
          {status === 'Playing' ? 'Stop' : 'Play'}
        </button>
        <button disabled={status !== 'Playing'}>Pause</button>
        <button>Step</button>
      </div>
      <div className="spacer" />
      <div className="menu-hint">File • Edit • Assets • Game • Window • Help</div>
    </div>
  );
}