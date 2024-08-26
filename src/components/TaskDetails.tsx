import Button from "./ui/Button";
import { IoClose } from "react-icons/io5";
import { useTaskDetailsStore } from "../stores/taskDetailsStore";
import TaskDetailsForm from "./forms/TaskDetailsForm";
import TaskFileForm from "./forms/TaskFileForm";

const TaskDetails = () => {
  const { hideDetails } = useTaskDetailsStore();

  return (
    <div className={`absolute w-full flex lg:w-fit lg:static`}>
      <div
        className="bg-black flex-1 opacity-55 lg:hidden"
        onClick={hideDetails}
      ></div>
      <aside className="bg-secondary p-4 flex flex-col w-10/12 md:w-8/12 h-dvh border-white border-l-2 lg:flex lg:static lg:border-0 lg:w-80 overflow-y-auto">
        <Button
          className="w-fit ml-auto bg-transparent px-3 py-1"
          onClick={hideDetails}
        >
          <IoClose size={30} />
        </Button>
        <TaskDetailsForm />
        <TaskFileForm />
      </aside>
    </div>
  );
};

export default TaskDetails;
