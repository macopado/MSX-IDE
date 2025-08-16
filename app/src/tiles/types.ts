export interface SFTile { id: number; x: number; y: number; }

export interface SFLayer {
  name: string;
  width: number;
  height: number;
  visible: boolean;
  tiles: SFTile[];
}

export interface TilesheetMeta {
  imagePath?: string;
  imageData?: string; // base64 opcional
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
}

export interface TileLayer {
  sfLayer: SFLayer;
}

export interface TilesGrid {
  tilesheet: TilesheetMeta;
  children: TileLayer[];
}