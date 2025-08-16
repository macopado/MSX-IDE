export function SceneView() {
  return (
    <div className="panel scene">
      <div className="panel-toolbar">
        <span className="panel-title">Scene</span>
        <div className="panel-actions">
          <button>2D</button>
          <button>Gizmos</button>
        </div>
      </div>
      <div className="panel-content">
        <div className="scene-canvas">
          <div className="grid" />
          <div className="hint">Scene View (mock)</div>
        </div>
      </div>
    </div>
  );
}