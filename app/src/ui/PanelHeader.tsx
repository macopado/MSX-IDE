import React from 'react';
import { CloseIcon, IconButton, MaximizeIcon, RestoreIcon } from './icons';

export function PanelHeader({
  title,
  draggableId,
  onClose,
  onToggleMaximize,
  isMaximized,
}: {
  title: string;
  draggableId: string;
  onClose?: () => void;
  onToggleMaximize?: () => void;
  isMaximized?: boolean;
}) {
  return (
    <div
      className="panel-header"
      draggable
      onDoubleClick={onToggleMaximize}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', draggableId);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      <div className="panel-title" title={title}>
        {title}
      </div>
      <div className="panel-actions">
        <IconButton title={isMaximized ? 'Restore' : 'Maximize'} onClick={onToggleMaximize}>
          {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
        </IconButton>
        <IconButton title="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}