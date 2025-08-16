import React from 'react';
import { useStore, UUID } from '@state/store';
import cls from 'classnames';

export default function HierarchyPanel() {
  const roots = useStore((s) => s.roots);
  const byId = useStore((s) => s.byId);
  const expanded = useStore((s) => s.expanded);
  const selection = useStore((s) => s.selection);
  const toggleExpanded = useStore((s) => s.toggleExpanded);
  const selectSingle = useStore((s) => s.selectSingle);
  const focus = useStore((s) => s.focusNodeInScene);

  const renderNode = (id: UUID, depth: number): React.ReactNode[] => {
    const n = byId[id];
    if (!n) return [];
    const isSelected = selection.has(id);
    const rows: React.ReactNode[] = [
      <div
        key={id}
        className={cls('hierarchy-item', { selected: isSelected })}
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={() => { selectSingle(id); }}
        onDoubleClick={() => focus(id)}
      >
        <span style={{ width: 12, display: 'inline-block' }} onClick={(e) => { e.stopPropagation(); toggleExpanded(id); }}>
          {n.children.length > 0 ? (expanded.has(id) ? '▾' : '▸') : ''}
        </span>
        <span>{n.name}</span>
      </div>
    ];
    if (n.children.length > 0 && expanded.has(id)) {
      for (const child of n.children) {
        rows.push(...renderNode(child, depth + 1));
      }
    }
    return rows;
  };

  return (
    <div className="panel">
      <div className="header">Hierarchy</div>
      <div className="content hierarchy-list">
        {roots.flatMap((r) => renderNode(r, 0))}
      </div>
    </div>
  );
}