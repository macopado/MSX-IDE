export function HierarchyView() {
  return (
    <div className="panel list-panel">
      <div className="panel-toolbar">
        <span className="panel-title">Hierarchy</span>
      </div>
      <div className="panel-content scroll">
        <ul className="tree">
          <li>
            Level - 1
            <ul>
              <li>Camera</li>
              <li>Light</li>
              <li>Player</li>
              <li>Environment</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}