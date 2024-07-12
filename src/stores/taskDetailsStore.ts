import { create } from "zustand";

interface TaskDetailsState {
  isVisible: boolean;
  toggleDetails: () => void;
  hideDetails: () => void;
  showDetails: () => void;
}

export const useTaskDetailsStore = create<TaskDetailsState>((set) => ({
  isVisible: false,
  toggleDetails: () => set((state) => ({ isVisible: !state.isVisible })),
  hideDetails: () => set((_) => ({ isVisible: false })),
  showDetails: () => set((_) => ({ isVisible: true })),
}));
