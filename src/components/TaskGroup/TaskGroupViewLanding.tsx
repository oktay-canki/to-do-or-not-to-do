import { useTaskGroupStore } from "../../stores/taskGroupStore";
import AddTaskGroupForm from "../forms/AddTaskGroupForm";
import SidebarToggler from "../Sidebar/SidebarToggler";

const TaskGroupViewLanding = () => {
  const { taskGroups } = useTaskGroupStore();
  return (
    <div className="flex flex-col flex-1 p-8 min-w-0">
      <SidebarToggler />

      {(!taskGroups || !taskGroups.length) && (
        <div className="lg:hidden flex flex-col gap-4 flex-1 justify-center items-center">
          <h2 className="text-2xl text-secondary-text">
            Start by creating a new List
          </h2>
          <AddTaskGroupForm />
        </div>
      )}
    </div>
  );
};

export default TaskGroupViewLanding;
