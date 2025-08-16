export function StatusBar(props: { onResetLayout: () => void }) {
  return (
    <div className="statusbar">
      <div>MSX-IDE mock</div>
      <div className="right">
        <button className="link-btn" onClick={props.onResetLayout} title="Restore default panel layout">
          Reset Layout
        </button>
      </div>
    </div>
  );
}