import { create } from 'zustand';

interface SideMenuOpenState {
  isOpen: boolean | null;
  setIsOpen: (newValue: boolean) => void;
}

export const useSideMenuOpen = create<SideMenuOpenState>((set) => ({
  isOpen: null,
  setIsOpen: (newValue) => set({ isOpen: newValue }),
}));
