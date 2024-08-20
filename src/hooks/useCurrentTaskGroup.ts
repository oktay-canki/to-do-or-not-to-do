import { useTaskGroupStore } from "../stores/taskGroupStore";

const useCurrentTaskGroup = () => {
  const { selectedTaskGroup } = useTaskGroupStore();

  if (!selectedTaskGroup)
    throw new Error("Current task group is not available");

  return selectedTaskGroup;
};

export default useCurrentTaskGroup;
