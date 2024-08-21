import { useTaskDetailsStore } from "../stores/taskDetailsStore";

const useCurrentTask = () => {
  const { selectedTask } = useTaskDetailsStore();

  if (!selectedTask) throw new Error("Current task is not available");

  return selectedTask;
};

export default useCurrentTask;
