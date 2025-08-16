export function GameView(props: { playing: boolean; paused: boolean }) {
  return (
    <div className="panel game">
      <div className="panel-toolbar">
        <span className="panel-title">Game</span>
        <div className="panel-actions">
          <select defaultValue="Display 1">
            <option>Display 1</option>
          </select>
          <select defaultValue="Free Aspect">
            <option>Free Aspect</option>
            <option>16:9</option>
            <option>4:3</option>
          </select>
          <span>Scale</span>
          <select defaultValue="1x">
            <option>0.5x</option>
            <option>1x</option>
            <option>2x</option>
          </select>
          <span>{props.playing ? (props.paused ? "Paused" : "Play Focused") : "Edit Mode"}</span>
        </div>
      </div>
      <div className="panel-content">
        <div className="game-surface">
          <div className="hint">Game View (mock)</div>
        </div>
      </div>
    </div>
  );
}