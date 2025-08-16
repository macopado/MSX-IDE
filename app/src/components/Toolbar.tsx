import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import "./toolbar.css";

export function Toolbar(props: {
  playing: boolean;
  paused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
}) {
  const { playing, paused, onPlay, onPause, onStep } = props;
  return (
    <div className="toolbar">
      <button className={`tool-btn ${playing ? "active" : ""}`} title="Play" onClick={onPlay}>
        <FaPlay />
      </button>
      <button
        className={`tool-btn ${paused ? "active" : ""}`}
        title="Pause"
        onClick={onPause}
        disabled={!playing}
      >
        <FaPause />
      </button>
      <button className="tool-btn" title="Step" onClick={onStep} disabled={!playing}>
        <FaStepForward />
      </button>
      <div className="sep" />
      <div className="play-state">{playing ? (paused ? "Paused" : "Playing") : "Stopped"}</div>
    </div>
  );
}