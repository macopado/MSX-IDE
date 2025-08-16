import React from 'react';
import { Mosaic, MosaicBranch, MosaicNode, MosaicWindow } from 'react-mosaic-component';

type TilesMap = Record<string, React.ReactNode>;

const defaultTree: MosaicNode<string> = {
  direction: 'row',
  first: {
    direction: 'column',
    first: 'Hierarchy',
    second: 'Scene',
    splitPercentage: 60
  },
  second: {
    direction: 'column',
    first: 'Project',
    second: {
      direction: 'row',
      first: 'Inspector',
      second: 'Game',
      splitPercentage: 50
    },
    splitPercentage: 60
  },
  splitPercentage: 20
};

export default function DockLayout({ tiles }: { tiles: TilesMap }) {
  const [layout, setLayout] = React.useState<MosaicNode<string> | null>(defaultTree);

  const renderTile = React.useCallback((id: string, path: MosaicBranch[]) => {
    return (
      <MosaicWindow<string> path={path} title={id}>
        <div className="panel">
          <div className="header">{id}</div>
          <div className="content">{tiles[id]}</div>
        </div>
      </MosaicWindow>
    );
  }, [tiles]);

  return (
    <Mosaic<string>
      className="mosaic-root"
      renderTile={renderTile}
      value={layout}
      onChange={setLayout}
    />
  );
}