import { RxDragHandleDots2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useTaskGroupStore } from "../../stores/taskGroupStore";
import TaskGroup from "../../types/TaskGroup";
import TaskGroupListSkeleton from "./TaskGroupListSkeleton";
import { firebaseErrorMessage, isRequestError } from "../../utils/main";
import { toast } from "react-toastify";
import updateTaskGroupsBatch from "../../services/firebase/task-groups/updateTaskGroupsBatch";
import useCurrentUser from "../../hooks/useCurrentUser";
import LoadingSpinner from "../common/LoadingSpinner";
import DNDList from "../DNDList/DNDList";
import { useDNDStore } from "../../stores/dndStore";
import { useTaskDetailsStore } from "../../stores/taskDetailsStore";
import { useSidebarStore } from "../../stores/sidebarStore";

type TaskGroupListProps = {
  className?: string;
};

const TaskGroupList = ({ className }: TaskGroupListProps) => {
  const currentUser = useCurrentUser();
  const { isLoading, taskGroups, selectedTaskGroup, setSelectedTaskGroup } =
    useTaskGroupStore();
  const { setSelectedTask } = useTaskDetailsStore();
  const { clearDND, draggedItemId, sourceListId } = useDNDStore();
  const { hideSidebar } = useSidebarStore();
  const [localTaskGroups, setLocalTaskGroups] = useState<TaskGroup[]>(() => {
    return taskGroups ?? [];
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    setLocalTaskGroups((prev) => taskGroups ?? []);
  }, [taskGroups]);

  const handleDrop = async (destinationListId: string, index?: number) => {
    if (
      isUpdating ||
      !draggedItemId ||
      !sourceListId ||
      (sourceListId === destinationListId && index === undefined)
    ) {
      clearDND();
      return;
    }

    setIsUpdating((prev) => true);
    let localTaskGroupsClone = [...localTaskGroups];
    let oldIndex = localTaskGroupsClone.findIndex(
      (tg) => tg.id === draggedItemId
    );
    if (
      sourceListId === "GroupList" &&
      destinationListId === "GroupList" &&
      index !== undefined
    ) {
      // Reorder within the list
      try {
        const [movedTaskGroup] = localTaskGroupsClone.splice(oldIndex, 1);
        if (oldIndex < index) {
          index--;
        }
        localTaskGroupsClone.splice(index, 0, movedTaskGroup);
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
      }
    }

    clearDND();
    setIsUpdating((prev) => false);
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
          <DNDList<TaskGroup>
            className="flex-1 overflow-y-auto"
            liClassName="flex flex-col py-3 px-2 cursor-pointer hover:bg-primary transition-all"
            listId="GroupList"
            items={localTaskGroups}
            getItemId={(taskGroup) => taskGroup.id}
            itemRender={(taskGroup) => (
              <div className="flex gap-2 items-center">
                <RxDragHandleDots2 size={30} />
                <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {taskGroup.title}
                </span>
              </div>
            )}
            listDragOverStyle={{ borderColor: "white" }}
            itemDragBorder="yellow"
            itemDragOverBorder="white"
            handleDrop={handleDrop}
            onItemClick={(taskGroup) => {
              setSelectedTaskGroup(taskGroup);
              hideSidebar();
              /*
              if (selectedTaskGroup && taskGroup.id !== selectedTaskGroup.id) {
                setSelectedTask(undefined);
              }*/
            }}
          />
        </>
      )}
    </div>
  );
};

export default TaskGroupList;
