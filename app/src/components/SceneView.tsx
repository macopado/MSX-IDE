import React from 'react';
import { useStore } from '@state/store';

const MIN_ZOOM = 8;   // px per unit
const MAX_ZOOM = 400; // px per unit

export default function SceneView() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rev = useStore((s) => s.rev);
  const focusEvent = useStore((s) => s.focusEvent);
  const computeBounds = useStore((s) => s.computeNodeBounds);

  const [pan, setPan] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<number>(60);

  React.useEffect(() => {
    if (!focusEvent.id) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    const b = computeBounds(focusEvent.id);
    const padding = 0.9;
    const newZoom = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, Math.min((vw * padding) / b.w, (vh * padding) / b.h))
    );
    setZoom(newZoom);
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    setPan({ x: -cx, y: -cy });
  }, [focusEvent.tick]);

  React.useEffect(() => {
    draw();
  }, [rev, pan, zoom]);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const draw = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const toScreen = (x: number, y: number) => {
      const sx = rect.width / 2 + (x + pan.x) * zoom;
      const sy = rect.height / 2 + (-y - pan.y) * zoom;
      return { x: sx, y: sy };
    };

    const minorStep = gridStep(zoom);
    const majorEvery = 10;
    const left = (-rect.width / 2) / zoom - pan.x;
    const right = (rect.width / 2) / zoom - pan.x;
    const top = (rect.height / 2) / zoom + pan.y;
    const bottom = (-rect.height / 2) / zoom + pan.y;

    ctx.lineWidth = 1;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-minor').trim();
    ctx.beginPath();
    for (let x = Math.floor(left / minorStep) * minorStep; x <= right; x += minorStep) {
      const p1 = toScreen(x, top);
      const p2 = toScreen(x, bottom);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    for (let y = Math.floor(bottom / minorStep) * minorStep; y <= top; y += minorStep) {
      const p1 = toScreen(left, y);
      const p2 = toScreen(right, y);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-major').trim();
    ctx.beginPath();
    for (let x = Math.floor(left); x <= right; x++) {
      if (x % majorEvery !== 0) continue;
      const p1 = toScreen(x, top);
      const p2 = toScreen(x, bottom);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    for (let y = Math.floor(bottom); y <= top; y++) {
      if (y % majorEvery !== 0) continue;
      const p1 = toScreen(left, y);
      const p2 = toScreen(right, y);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    const axisX = getComputedStyle(document.documentElement).getPropertyValue('--axis-x').trim();
    const axisY = getComputedStyle(document.documentElement).getPropertyValue('--axis-y').trim();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axisX;
    {
      const p1 = toScreen(left, 0);
      const p2 = toScreen(right, 0);
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    }
    ctx.strokeStyle = axisY;
    {
      const p1 = toScreen(0, bottom);
      const p2 = toScreen(0, top);
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    }
  };

  const lastDrag = React.useRef<{ x: number; y: number } | null>(null);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const worldBefore = {
      x: (mouse.x - rect.width / 2) / zoom - pan.x,
      y: -(mouse.y - rect.height / 2) / zoom - pan.y
    };

    const delta = Math.sign(e.deltaY) * -1;
    const factor = 1 + delta * 0.1;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * factor));
    setZoom(newZoom);

    const worldAfter = worldBefore;
    const newPan = {
      x: (mouse.x - rect.width / 2) / newZoom - worldAfter.x,
      y: -(mouse.y - rect.height / 2) / newZoom - worldAfter.y
    };
    setPan(newPan);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) return;
    lastDrag.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!lastDrag.current) return;
    const dx = e.clientX - lastDrag.current.x;
    const dy = e.clientY - lastDrag.current.y;
    lastDrag.current = { x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx / zoom, y: p.y - dy / zoom }));
  };

  const onMouseUp = () => { lastDrag.current = null; };
  const onMouseLeave = () => { lastDrag.current = null; };

  return (
    <canvas
      ref={canvasRef}
      className="scene-canvas"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    />
  );
}

function gridStep(zoom: number) {
  const pxTarget = 30;
  const units = pxTarget / zoom;
  const pow10 = Math.pow(10, Math.floor(Math.log10(units)));
  const candidates = [1, 2, 5, 10].map((m) => m * pow10);
  let best = candidates[0];
  let diff = Math.abs(best - units);
  for (const c of candidates) {
    const d = Math.abs(c - units);
    if (d < diff) { best = c; diff = d; }
  }
  return best;
}