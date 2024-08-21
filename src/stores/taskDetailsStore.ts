import { create } from "zustand";
import Task from "../types/Task";

interface TaskDetailsState {
  selectedTask: Task | undefined;
  setSelectedTask: (task: Task | undefined) => void;
  isVisible: boolean;
  toggleDetails: () => void;
  hideDetails: () => void;
  showDetails: () => void;
}

export const useTaskDetailsStore = create<TaskDetailsState>((set) => ({
  selectedTask: undefined,
  isVisible: false,
  setSelectedTask: (task) =>
    set((_) => {
      if (task !== undefined) {
        return { selectedTask: task, isVisible: true };
      }
      return { selectedTask: task };
    }),
  toggleDetails: () => set((state) => ({ isVisible: !state.isVisible })),
  hideDetails: () => set((_) => ({ isVisible: false })),
  showDetails: () => set((_) => ({ isVisible: true })),
}));
