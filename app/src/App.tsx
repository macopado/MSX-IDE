import { useEffect, useState } from "react";
import "flexlayout-react/style/dark.css";
import { Layout, Model } from "flexlayout-react";
import layoutJson from "./layout.json";

import { TopMenu } from "./components/TopMenu";
import { Toolbar } from "./components/Toolbar";
import { SceneView } from "./components/SceneView";
import { GameView } from "./components/GameView";
import { HierarchyView } from "./components/HierarchyView";
import { ProjectView } from "./components/ProjectView";
import { InspectorView } from "./components/InspectorView";
import { StatusBar } from "./components/StatusBar";

const STORAGE_KEY = "msxide_layout_v1";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [model, setModel] = useState<Model>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
      return Model.fromJson(saved ? JSON.parse(saved) : (layoutJson as any));
    } catch {
      return Model.fromJson(layoutJson as any);
    }
  });

  useEffect(() => {
    document.body.classList.add("unity-dark");
  }, []);

  const factory = (node: any) => {
    const component = node.getComponent();
    switch (component) {
      case "scene":
        return <SceneView />;
      case "game":
        return <GameView playing={playing} paused={paused} />;
      case "hierarchy":
        return <HierarchyView />;
      case "project":
        return <ProjectView />;
      case "inspector":
        return <InspectorView />;
      default:
        return <div style={{ padding: 16 }}>Unknown: {component}</div>;
    }
  };

  const handleModelChange = (m: Model) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m.toJson()));
    setModel(m);
  };

  const resetLayout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setModel(Model.fromJson(layoutJson as any));
  };

  return (
    <div className="app-root">
      <TopMenu />
      <Toolbar
        playing={playing}
        paused={paused}
        onPlay={() => {
          setPlaying((p) => !p);
          if (paused) setPaused(false);
        }}
        onPause={() => playing && setPaused((p) => !p)}
        onStep={() => {}}
      />
      <div className="workspace">
        <Layout model={model} factory={factory} onModelChange={handleModelChange} />
      </div>
      <StatusBar onResetLayout={resetLayout} />
    </div>
  );
}