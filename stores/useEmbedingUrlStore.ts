import { create } from 'zustand';

interface EmbedState {
  url: string | null;
  setUrl: (newUrl: string) => void;
  clearUrl: () => void;
}

export const useEmbedingUrlStore = create<EmbedState>((set) => ({
  url: null,
  setUrl: (newUrl: string) => set({ url: newUrl }),
  clearUrl: () => set({ url: '' }),
}));
