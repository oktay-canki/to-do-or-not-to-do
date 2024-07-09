import { RxDragHandleDots2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import { useTaskGroupStore } from "../stores/taskGroupStore";
import TaskGroup from "../types/TaskGroup";
import TaskGroupListSkeleton from "./TaskGroupListSkeleton";
import { firebaseErrorMessage, isRequestError } from "../utils/main";
import { toast } from "react-toastify";
import updateTaskGroupsBatch from "../services/firebase/task-groups/updateTaskGroupsBatch";
import { useCurrentUser } from "../stores/userStore";
import LoadingSpinner from "./LoadingSpinner";

type TaskGroupListProps = {
  className?: string;
};

const TaskGroupList = ({ className }: TaskGroupListProps) => {
  const currentUser = useCurrentUser();
  const { isLoading, taskGroups } = useTaskGroupStore();
  const [localTaskGroups, setLocalTaskGroups] = useState<TaskGroup[]>(() => {
    return taskGroups ?? [];
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    setLocalTaskGroups((prev) => taskGroups ?? []);
  }, [taskGroups]);

  const dragTaskGroup = useRef<number>(-1);
  const draggedOverTaskGroup = useRef<number>(-1);

  const handleSort = async () => {
    if (
      [dragTaskGroup.current, draggedOverTaskGroup.current].includes(-1) ||
      dragTaskGroup.current === draggedOverTaskGroup.current
    )
      return;
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const localTaskGroupsClone = [...localTaskGroups];
      const [item] = localTaskGroupsClone.splice(dragTaskGroup.current, 1);
      localTaskGroupsClone.splice(draggedOverTaskGroup.current, 0, item);
      await updateTaskGroupsBatch(
        currentUser.id,
        localTaskGroupsClone.map(
          (taskGroup, idx) =>
            ({
              ...taskGroup,
              groupOrder: idx + 1,
            } as TaskGroup)
        ) as TaskGroup[]
      );
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`flex flex-col flex-1 min-h-0 relative ${className}`}>
      {isLoading && <TaskGroupListSkeleton />}
      {!isLoading && taskGroups !== undefined && (
        <>
          {isUpdating && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex justify-center pt-20">
              <LoadingSpinner />
            </div>
          )}
          <ul className="flex-1 overflow-y-auto">
            {localTaskGroups.map((taskGroup, idx) => (
              <li
                key={idx}
                className="flex items-center py-3 px-2 gap-2 cursor-pointer hover:bg-primary transition-all"
                draggable
                onDragStart={() => (dragTaskGroup.current = idx)}
                onDragEnter={() => (draggedOverTaskGroup.current = idx)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <RxDragHandleDots2 size={30} />
                <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {taskGroup.title}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskGroupList;
