import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { IoShareSocial } from "react-icons/io5";
import SidebarToggler from "../Sidebar/SidebarToggler";
import AddTaskForm from "../forms/AddTaskForm";
import useCurrentTaskGroup from "../../hooks/useCurrentTaskGroup";
import useCurrentUser from "../../hooks/useCurrentUser";
import Task from "../../types/Task";
import DNDList from "../DNDList/DNDList";
import LoadingSpinner from "../common/LoadingSpinner";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../services/firebase/main";
import { BiSolidError } from "react-icons/bi";
import { useTaskDetailsStore } from "../../stores/taskDetailsStore";
import TaskGroupTitleForm from "../forms/TaskGroupTitleForm";
import setIsCompletedTask from "../../services/firebase/tasks/setTaskIsCompleted";
import {
  firebaseErrorMessage,
  isRequestError,
  sortByCreatedAt,
} from "../../utils/main";
import { toast } from "react-toastify";
import { docDataToTaskObject } from "../../services/firebase/tasks/mappers";
import EmptyTaskGroupView from "./EmptyTaskGroupView";
import { MdDelete } from "react-icons/md";
import Modal from "../common/Modal";
import deleteTaskGroup from "../../services/firebase/task-groups/deleteTaskGroup";

const TaskGroupView = () => {
  const currentUser = useCurrentUser();
  const currentTaskGroup = useCurrentTaskGroup();
  const { setSelectedTask } = useTaskDetailsStore();
  const [notCompletedTasks, setNotCompletedTasks] = useState<
    Task[] | undefined
  >(undefined);
  const [completedTasks, setCompletedTasks] = useState<Task[] | undefined>(
    undefined
  );
  const [error, setError] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let isLoading = !error && (!completedTasks || !notCompletedTasks);
  let isAnyNotCompletedTasks =
    notCompletedTasks && notCompletedTasks.length > 0;
  let isAnyCompletedTasks = completedTasks && completedTasks.length > 0;
  let isError = notCompletedTasks && completedTasks && error;

  useEffect(() => {
    const tasksQuery = query(
      collection(
        db,
        "users",
        currentUser.id,
        "taskGroups",
        currentTaskGroup.id,
        "tasks"
      )
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) =>
          docDataToTaskObject(doc)
        ) as Task[];
        const { completed, notCompleted } = updatedTasks.reduce(
          (acc, task) => {
            if (task.isCompleted) {
              acc.completed.push(task);
            } else {
              acc.notCompleted.push(task);
            }
            return acc;
          },
          {
            completed: [] as Task[],
            notCompleted: [] as Task[],
          }
        );
        setNotCompletedTasks(sortByCreatedAt(notCompleted) as Task[]);
        setCompletedTasks(sortByCreatedAt(completed) as Task[]);
        setError(false);
      },
      (error) => {
        setError(true);
        console.error("Error fetching tasks:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentTaskGroup.id]);

  const handleNotCompletedCheck = async (task: Task) => {
    try {
      setIsCompletedTask(currentUser.id, currentTaskGroup.id, task.id, true);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    }
  };

  const handleCompletedCheck = async (task: Task) => {
    try {
      setIsCompletedTask(currentUser.id, currentTaskGroup.id, task.id, false);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteTaskGroup(currentUser.id, currentTaskGroup.id);
    } catch (error) {
      if (isRequestError(error)) {
        toast.error(firebaseErrorMessage(error));
      } else {
        toast.error("An unknown error occurred.");
      }
      console.log(error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col flex-1 p-8 min-w-0">
      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          message={`Are you sure you want to delete this task list? (${currentTaskGroup.title}, ${currentTaskGroup.id})`}
          onConfirm={() => {
            handleDelete();
            setDeleteModalOpen(false);
          }}
          onCancel={() => {
            setDeleteModalOpen(false);
          }}
        />
      )}
      <SidebarToggler />
      <div className="flex items-center py-8 pr-6">
        <div className="flex flex-1 flex-col">
          <TaskGroupTitleForm />
          <small className="text-base text-secondary-text ml-2">
            #{currentTaskGroup.id}
          </small>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button className="rounded-full p-3">
            <IoShareSocial size={22} />
          </Button>
          <div className="w-[2px] h-5 bg-white rounded-s-md "></div>
          <Button
            className="rounded-full p-3 bg-danger"
            onClick={() => setDeleteModalOpen((prev) => !prev)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <LoadingSpinner height={22} width={22} />
            ) : (
              <MdDelete size={22} />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {isError && (
          <div className="flex items-center justify-center py-10 gap-2 text-danger">
            <BiSolidError size={24} /> Failed to fetch tasks
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <LoadingSpinner />
          </div>
        )}
        {isAnyNotCompletedTasks && (
          <DNDList<Task>
            liClassName="flex flex-col mb-2 bg-secondary rounded-md rounded-t-none cursor-pointer hover:bg-primary"
            listId="NotCompletedTasks"
            items={notCompletedTasks ?? []}
            getItemId={(task) => task.id}
            itemRender={(task) => (
              <div className="flex gap-2 py-3 px-4 items-center">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotCompletedCheck(task);
                  }}
                  checked={false}
                  onChange={() => {}}
                />
                <span className="flex flex-1">{task.title}</span>
              </div>
            )}
            listDragOverStyle={{ borderColor: "white" }}
            itemDragBorder="yellow"
            itemDragOverBorder="white"
            handleDrop={() => {}}
            onItemClick={(task) => {
              setSelectedTask(task);
            }}
          />
        )}
        {isAnyCompletedTasks && (
          <>
            <span className="block w-fit rounded-md px-3 py-1 mt-8 mb-2 text-md bg-secondary">
              Completed
            </span>
            <DNDList<Task>
              liClassName="flex flex-col mb-2 px-4 bg-secondary rounded-md rounded-t-none cursor-pointer hover:bg-primary"
              listId="CompletedTasks"
              items={completedTasks ?? []}
              getItemId={(task) => task.id}
              itemRender={(task) => (
                <div className="flex gap-2 py-3 items-center">
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompletedCheck(task);
                    }}
                    checked={true}
                    onChange={() => {}}
                  />
                  <span className="flex flex-1 line-through text-secondary-text">
                    {task.title}
                  </span>
                </div>
              )}
              listDragOverStyle={{ borderColor: "white" }}
              itemDragBorder="yellow"
              itemDragOverBorder="white"
              handleDrop={() => {}}
              onItemClick={(task) => {
                setSelectedTask(task);
              }}
            />
          </>
        )}
        {!isAnyCompletedTasks && !isAnyNotCompletedTasks && (
          <EmptyTaskGroupView />
        )}
      </div>

      <div className="text-white mt-8">
        <AddTaskForm />
      </div>
    </div>
  );
};

export default TaskGroupView;
