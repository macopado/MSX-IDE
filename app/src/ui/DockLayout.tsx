import React, { useMemo, useState } from 'react';
import './panel.css';
import { PanelHeader } from './PanelHeader';

export type PanelConfig = {
  id: string;
  title: string;
  render: () => React.ReactNode;
};

type LayoutState = {
  order: string[];
  maximizedId?: string;
  prevOrder?: string[];
};

export function DockLayout({
  panels,
  initialOrder,
  onClosePanel,
}: {
  panels: PanelConfig[];
  initialOrder: string[];
  onClosePanel?: (id: string) => void;
}) {
  const [layout, setLayout] = useState<LayoutState>({ order: initialOrder });

  const panelMap = useMemo(() => {
    const m = new Map<string, PanelConfig>();
    panels.forEach((p) => m.set(p.id, p));
    return m;
  }, [panels]);

  const handleDropReorder = (dragId: string, dropIndex: number) => {
    setLayout((prev) => {
      const arr = prev.order.filter((id) => id !== dragId);
      arr.splice(dropIndex, 0, dragId);
      return { ...prev, order: arr };
    });
  };

  const toggleMaximize = (id: string) => {
    setLayout((prev) => {
      if (prev.maximizedId === id) {
        const restored = prev.prevOrder ?? prev.order;
        const { maximizedId, prevOrder, ...rest } = prev;
        return { ...rest, order: restored, maximizedId: undefined, prevOrder: undefined };
      }
      return { order: [id], maximizedId: id, prevOrder: prev.order };
    });
  };

  if (layout.maximizedId) {
    const p = panelMap.get(layout.maximizedId);
    if (!p) return null;
    return (
      <div className="panel" style={{ width: '100%', height: '100%' }}>
        <PanelHeader
          title={p.title}
          draggableId={p.id}
          isMaximized
          onToggleMaximize={() => toggleMaximize(p.id)}
          onClose={() => onClosePanel?.(p.id)}
        />
        <div className="panel-body">{p.render()}</div>
      </div>
    );
  }

  return (
    <div
      className="dock-root"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layout.order.length}, 1fr)`,
        gap: 8,
        width: '100%',
        height: '100%',
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
        const dragId = e.dataTransfer.getData('text/plain');
        if (dragId) handleDropReorder(dragId, layout.order.length);
      }}
    >
      {layout.order.map((id, index) => {
        const p = panelMap.get(id);
        if (!p) return null;
        return (
          <div
            key={id}
            className="panel"
            style={{ minWidth: 200, minHeight: 120 }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const dragId = e.dataTransfer.getData('text/plain');
              if (!dragId || dragId === id) return;
              handleDropReorder(dragId, index);
            }}
          >
            <PanelHeader
              title={p.title}
              draggableId={id}
              onToggleMaximize={() => toggleMaximize(id)}
              onClose={() => onClosePanel?.(id)}
            />
            <div className="panel-body">{p.render()}</div>
          </div>
        );
      })}
    </div>
  );
}