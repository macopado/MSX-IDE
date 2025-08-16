export function InspectorView() {
  return (
    <div className="panel inspector">
      <div className="panel-toolbar">
        <span className="panel-title">Inspector</span>
      </div>
      <div className="panel-content scroll">
        <section className="inspector-section">
          <h4>Transform</h4>
          <div className="grid-3">
            <label>X</label>
            <input defaultValue="0" />
            <div />
            <label>Y</label>
            <input defaultValue="0" />
            <div />
            <label>Z</label>
            <input defaultValue="0" />
            <div />
          </div>
        </section>
        <section className="inspector-section">
          <h4>Renderer</h4>
          <div className="grid-2">
            <label>Material</label>
            <input defaultValue="Default" />
            <label>Visible</label>
            <input type="checkbox" defaultChecked />
          </div>
        </section>
      </div>
    </div>
  );
}