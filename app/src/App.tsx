import React from 'react';
import DockLayout from '@ui/DockLayout';
import SceneView from '@components/SceneView';
import HierarchyPanel from '@hierarchy/HierarchyPanel';
import InspectorView from '@inspector/InspectorView';
import ProjectPanel from '@project/ProjectPanel';
import GameView from '@game/GameView';
import { useStore } from '@state/store';
import 'react-mosaic-component/react-mosaic-component.css';

export default function App() {
  const status = useStore(s => s.playbackStatus);
  return (
    <div className="app-root">
      <TopBar status={status} />
      <DockLayout
        tiles={{
          Scene: <SceneView />,
          Hierarchy: <HierarchyPanel />,
          Inspector: <InspectorView />,
          Project: <ProjectPanel />,
          Game: <GameView />
        }}
      />
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