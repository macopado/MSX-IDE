import "./topmenu.css";

export function TopMenu() {
  const menus = [
    { title: "File", items: ["New Project…", "Open…", "Save", "Exit"] },
    { title: "Edit", items: ["Undo", "Redo", "Copy", "Paste"] },
    { title: "Assets", items: ["Create", "Import…"] },
    { title: "Game", items: ["Play", "Pause", "Step"] },
    { title: "Window", items: ["Layouts", "Panels"] },
    { title: "Help", items: ["About", "Docs"] }
  ];
  return (
    <div className="topmenu">
      <div className="app-title">MSX-IDE</div>
      {menus.map((m) => (
        <div key={m.title} className="menu-item">
          {m.title}
        </div>
      ))}
      <div className="spacer" />
      <div className="workspace-indicator">Default</div>
    </div>
  );
}