export function ProjectView() {
  const folders = [
    "Animations",
    "Materials",
    "Prefabs",
    "Scenes",
    "Scripts",
    "Shaders",
    "Audio",
    "Textures",
    "Models",
    "Packages"
  ];
  return (
    <div className="panel list-panel">
      <div className="panel-toolbar">
        <span className="panel-title">Project</span>
        <div className="panel-actions">
          <input placeholder="Search" />
        </div>
      </div>
      <div className="panel-content scroll grid-icons">
        {folders.map((f) => (
          <div key={f} className="icon-folder">
            <div className="icon" />
            <div className="label">{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}