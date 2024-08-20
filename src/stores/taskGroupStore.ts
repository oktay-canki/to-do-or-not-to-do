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
  selectedTaskGroupId: string | undefined;
  setSelectedTaskGroup: (groupId: string) => void;
}

export const useTaskGroupStore = create<TaskGroupState>((set) => ({
  taskGroups: undefined,
  selectedTaskGroupId: undefined,
  isLoading: false,

  setTaskGroups: (taskGroups: TaskGroup[] | undefined) => {
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

  setSelectedTaskGroup: (taskGroupId) => {
    set({ selectedTaskGroupId: taskGroupId });
  },
}));
