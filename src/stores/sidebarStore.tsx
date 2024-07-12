import { create } from "zustand";

interface SidebarState {
  isVisible: boolean;
  toggleSidebar: () => void;
  hideSidebar: () => void;
  showSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isVisible: false,
  toggleSidebar: () => set((state) => ({ isVisible: !state.isVisible })),
  hideSidebar: () => set((_) => ({ isVisible: false })),
  showSidebar: () => set((_) => ({ isVisible: true })),
}));
