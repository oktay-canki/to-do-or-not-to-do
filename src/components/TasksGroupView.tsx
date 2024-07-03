import { LuClipboardList } from "react-icons/lu";
import Input from "./ui/Input";
import { useRef, useState } from "react";
import Button from "./ui/Button";
import { MdSend } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import SidebarToggler from "./SidebarToggler";
import useTaskDetailsContext from "../hooks/useTaskDetailsContext";

const TaskGroupView = () => {
  const [tasks, setTasks] = useState([
    { order: 0, title: "Vegetables (tomatoes & cucumber)" },
    { order: 1, title: "Trash bag" },
    { order: 2, title: "Bread" },
    { order: 3, title: "Drinks and snacks" },
  ]);

  const { showDetails } = useTaskDetailsContext(); // TODO: remove this after implementing details

  const dragTask = useRef<number>(0);
  const draggedOverTask = useRef<number>(0);

  const handleSort = () => {
    const tasksClone = [...tasks];
    const [item] = tasksClone.splice(dragTask.current, 1);
    tasksClone.splice(draggedOverTask.current, 0, item);
    setTasks((prev) =>
      tasksClone.map((task, idx) => ({ ...task, order: idx }))
    );
  };

  return (
    <div className="flex flex-col flex-1 p-8 min-w-0">
      <SidebarToggler />
      <div className="flex items-center py-8 px-6 gap-2">
        <LuClipboardList size={28} />
        <h2 className="flex-1 text-2xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          List group title
        </h2>
        <Button className="rounded-full p-3">
          <IoShareSocial size={22} />
        </Button>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <ul>
          {tasks.map((task, idx) => (
            <li
              key={idx}
              className="flex items-center mb-2 px-4 py-3 gap-2 bg-secondary rounded-md cursor-pointer hover:bg-primary"
              draggable
              onDragStart={() => (dragTask.current = idx)}
              onDragEnter={() => (draggedOverTask.current = idx)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              onClick={showDetails}
            >
              <input type="checkbox" />
              <span className="flex flex-1">{task.title}</span>
            </li>
          ))}
        </ul>
        <span className="block w-fit rounded-md px-3 py-1 mt-8 mb-2 text-md bg-secondary">
          Completed
        </span>
        <ul>
          <li
            key={1}
            className="flex items-center mb-2 px-4 py-3 gap-2 bg-secondary rounded-md"
          >
            <input type="checkbox" defaultChecked readOnly />
            <span className="flex flex-1 line-through text-secondary-text">
              Paper Towel
            </span>
          </li>
        </ul>
      </div>

      <div className="text-white mt-8">
        <form className="flex w-full">
          <Input className="rounded-r-none" placeholder="Add a new task" />
          <Button className="rounded-l-none px-4">
            <MdSend size={24} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskGroupView;
