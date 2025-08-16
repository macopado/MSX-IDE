import { create } from 'zustand';

type PlaybackStatus = 'Stopped' | 'Playing';

interface AppState {
  playbackStatus: PlaybackStatus;
  setPlaybackStatus: (status: PlaybackStatus) => void;
}

export const useStore = create<AppState>((set) => ({
  playbackStatus: 'Stopped',
  setPlaybackStatus: (status) => set({ playbackStatus: status }),
}));