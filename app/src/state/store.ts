import { create } from 'zustand';

export type UUID = string;
export type NodeType = 'Empty' | 'TilesGrid' | 'TileLayer' | 'Generic';

export interface Vec2 { x: number; y: number; }
export interface Transform2D {
  position: Vec2;
  rotation: { z: number }; // degrees
  scale: Vec2;
}

export interface TreeNode {
  id: UUID;
  name: string;
  type: NodeType;
  active: boolean;
  children: UUID[];
  parentId: UUID | null;
  order: number;
  transform: Transform2D;
  isScene?: boolean;
}

export interface StoreState {
  rev: number;
  roots: UUID[];
  byId: Record<UUID, TreeNode>;
  expanded: Set<UUID>;
  selection: Set<UUID>;
  undoStack: string[];
  redoStack: string[];
  clipboard?: Transform2D;
  playbackStatus: 'Stopped' | 'Playing';

  focusEvent: { id?: UUID; tick: number };

  initNewProject(): void;
  setPlaybackStatus(s: 'Stopped' | 'Playing'): void;

  selectSingle(id: UUID): void;
  toggleExpanded(id: UUID): void;

  setTransformValueLive(id: UUID, path: 'position.x'|'position.y'|'rotation.z'|'scale.x'|'scale.y', value: number): void;
  resetTransform(id: UUID): void;
  copyTransform(id: UUID): void;
  pasteTransform(id: UUID): void;

  focusNodeInScene(id: UUID): void;

  isSceneNode(id: UUID): boolean;

  computeNodeBounds(id: UUID): { x: number; y: number; w: number; h: number };
}

function uid(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function identity(): Transform2D {
  return {
    position: { x: 0, y: 0 },
    rotation: { z: 0 },
    scale: { x: 1, y: 1 }
  };
}

export const useStore = create<StoreState>((set, get) => ({
  rev: 0,
  roots: [],
  byId: {},
  expanded: new Set<UUID>(),
  selection: new Set<UUID>(),
  undoStack: [],
  redoStack: [],
  playbackStatus: 'Stopped',
  focusEvent: { tick: 0 },

  initNewProject() {
    const sceneId = uid();
    const scene: TreeNode = {
      id: sceneId,
      name: 'Scene',
      type: 'Empty',
      active: true,
      children: [],
      parentId: null,
      order: 0,
      transform: identity(),
      isScene: true
    };
    set({
      roots: [sceneId],
      byId: { [sceneId]: scene },
      expanded: new Set([sceneId]),
      selection: new Set([sceneId]),
      undoStack: [],
      redoStack: [],
      rev: 1
    });
  },

  setPlaybackStatus(s) { set({ playbackStatus: s }); },

  selectSingle(id) { set({ selection: new Set([id]) }); },

  toggleExpanded(id) {
    const ex = new Set(get().expanded);
    if (ex.has(id)) ex.delete(id); else ex.add(id);
    set({ expanded: ex });
  },

  isSceneNode(id) {
    const n = get().byId[id];
    return !!n?.isScene;
  },

  setTransformValueLive(id, path, value) {
    if (get().isSceneNode(id)) return;
    const byId = { ...get().byId };
    const n = { ...byId[id] };
    const t = { ...n.transform, position: { ...n.transform.position }, rotation: { ...n.transform.rotation }, scale: { ...n.transform.scale } };
    switch (path) {
      case 'position.x': t.position.x = value; break;
      case 'position.y': t.position.y = value; break;
      case 'rotation.z': t.rotation.z = value; break;
      case 'scale.x': t.scale.x = value; break;
      case 'scale.y': t.scale.y = value; break;
    }
    n.transform = t;
    byId[id] = n;
    set({ byId, rev: get().rev + 1 });
  },

  resetTransform(id) {
    if (get().isSceneNode(id)) return;
    const byId = { ...get().byId };
    const n = { ...byId[id], transform: identity() };
    byId[id] = n;
    set({ byId, rev: get().rev + 1 });
  },

  copyTransform(id) {
    const n = get().byId[id]; if (!n) return;
    set({ clipboard: JSON.parse(JSON.stringify(n.transform)) });
  },

  pasteTransform(id) {
    if (get().isSceneNode(id)) return;
    const clip = get().clipboard; if (!clip) return;
    const byId = { ...get().byId };
    const n = { ...byId[id], transform: JSON.parse(JSON.stringify(clip)) };
    byId[id] = n;
    set({ byId, rev: get().rev + 1 });
  },

  focusNodeInScene(id) {
    set({ focusEvent: { id, tick: get().focusEvent.tick + 1 } });
  },

  computeNodeBounds(id) {
    const n = get().byId[id];
    if (!n) return { x: -0.5, y: -0.5, w: 1, h: 1 };
    if (n.type === 'TilesGrid' || n.type === 'TileLayer') {
      return { x: 0, y: 0, w: 10, h: 10 };
    }
    return { x: -0.5, y: -0.5, w: 1, h: 1 };
  }
}));

if (typeof window !== 'undefined') {
  const s = useStore.getState();
  if (s.roots.length === 0) s.initNewProject();
}