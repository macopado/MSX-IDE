import React from 'react';
import { useStore } from '@state/store';

export default function InspectorView() {
  const selection = useStore((s) => s.selection);
  const byId = useStore((s) => s.byId);
  const setVal = useStore((s) => s.setTransformValueLive);
  const reset = useStore((s) => s.resetTransform);
  const copy = useStore((s) => s.copyTransform);
  const paste = useStore((s) => s.pasteTransform);
  const isSceneNode = useStore((s) => s.isSceneNode);

  const ids = Array.from(selection);
  const singleId = ids.length === 1 ? ids[0] : undefined;
  const node = singleId ? byId[singleId] : undefined;
  const blocked = singleId ? isSceneNode(singleId) : false;

  return (
    <div className="panel">
      <div className="header">Inspector</div>
      <div className="content" style={{ padding: 8, fontSize: 12, overflow: 'auto' }}>
        {!singleId && <div>Selecciona un elemento.</div>}
        {singleId && node && (
          <>
            <div style={{ opacity: blocked ? 0.6 : 1 }}>
              <h4 style={{ margin: '6px 0' }}>Transform</h4>
              <Field label="Position X" value={node.transform.position.x} disabled={blocked} onChange={(v) => setVal(node.id, 'position.x', v)} />
              <Field label="Position Y" value={node.transform.position.y} disabled={blocked} onChange={(v) => setVal(node.id, 'position.y', v)} />
              <Field label="Rotation Z" value={node.transform.rotation.z} disabled={blocked} onChange={(v) => setVal(node.id, 'rotation.z', v)} />
              <Field label="Scale X" value={node.transform.scale.x} disabled={blocked} onChange={(v) => setVal(node.id, 'scale.x', v)} />
              <Field label="Scale Y" value={node.transform.scale.y} disabled={blocked} onChange={(v) => setVal(node.id, 'scale.y', v)} />
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <button disabled={blocked} onClick={() => reset(node.id)}>Reset</button>
                <button onClick={() => copy(node.id)}>Copy</button>
                <button disabled={blocked} onClick={() => paste(node.id)}>Paste</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, disabled }: { label: string; value: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0' }}>
      <span style={{ width: 90, color: '#9aa4b2' }}>{label}</span>
      <input
        type="number"
        disabled={disabled}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ flex: 1, background: '#2b2d31', color: '#d1d6e0', border: '1px solid #000', padding: '4px 6px', borderRadius: 3 }}
      />
    </label>
  );
}