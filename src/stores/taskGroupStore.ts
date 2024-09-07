import { create } from "zustand";
import TaskGroup from "../types/TaskGroup";
import fetchUserTaskGroups from "../services/firebase/task-groups/fetchUserTaskGroups";
import {
  firebaseErrorMessage,
  isRequestError,
  sortByGroupOrder,
} from "../utils/main";
import { toast } from "react-toastify";

interface TaskGroupState {
  taskGroups: TaskGroup[] | undefined;
  setTaskGroups: (taskGroups: TaskGroup[]) => void;
  isLoading: boolean;
  fetchTaskGroups: (uid: string | null) => Promise<void>;
  selectedTaskGroup: TaskGroup | undefined;
  setSelectedTaskGroup: (taskGroup: TaskGroup) => void;
}

export const useTaskGroupStore = create<TaskGroupState>((set, get) => ({
  taskGroups: undefined,
  selectedTaskGroup: undefined,
  isLoading: false,

  setTaskGroups: (taskGroups: TaskGroup[] | undefined) => {
    if (taskGroups) {
      const currentSelected = get().selectedTaskGroup;
      if (currentSelected) {
        const updatedSelected = taskGroups.find(
          (tg) => tg.id === currentSelected.id
        );
        if (updatedSelected) {
          set({ selectedTaskGroup: updatedSelected });
        } else {
          set({ selectedTaskGroup: undefined });
        }
      }

      if (!currentSelected && taskGroups && taskGroups.length > 0) {
        set({ selectedTaskGroup: taskGroups[0] });
      }
    }
    set({ taskGroups, isLoading: false });
  },

  fetchTaskGroups: async (uid) => {
    set({ isLoading: true, taskGroups: undefined });
    if (!uid) {
      set({ isLoading: false, taskGroups: undefined });
      return;
    }

    try {
      const groups = await fetchUserTaskGroups(uid);
      set({ isLoading: false, taskGroups: sortByGroupOrder(groups) });
    } catch (error) {
      set({ isLoading: false, taskGroups: undefined });
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    }
  },
  setSelectedTaskGroup: (taskGroup) => {
    set({ selectedTaskGroup: taskGroup });
  },
}));
