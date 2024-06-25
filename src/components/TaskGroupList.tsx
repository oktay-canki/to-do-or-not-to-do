import { IoIosAdd } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState, useRef } from "react";

type TaskGroupListProps = {
  className?: string;
};

const TaskGroupList = ({ className }: TaskGroupListProps) => {
  const [taskGroups, setTaskGroups] = useState([
    { order: 1, title: "Shopping List" },
    { order: 2, title: "Job Related" },
    { order: 3, title: "Housework" },
    { order: 4, title: "Payments" },
    { order: 5, title: "Movies" },
  ]);

  const dragTaskGroup = useRef<number>(0);
  const draggedOverTaskGroup = useRef<number>(0);

  const handleSort = () => {
    const taskGroupsClone = [...taskGroups];
    const [item] = taskGroupsClone.splice(dragTaskGroup.current, 1);
    taskGroupsClone.splice(draggedOverTaskGroup.current, 0, item);
    setTaskGroups((prev) =>
      taskGroupsClone.map((taskGroup, idx) => ({ ...taskGroup, order: idx }))
    );
  };

  return (
    <div className={`flex flex-col flex-1 min-h-0 ${className}`}>
      <ul className="flex-1 overflow-y-auto">
        {taskGroups.map((taskGroup, idx) => (
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
      <form className="flex h-12">
        <input
          type="text"
          placeholder="Add new task group"
          className="h-12 flex-1 outline-none bg-transparent text-lg px-3 py-1 hover:bg-secondary focus:bg-secondary"
        />
        <button type="submit" className="h-12 px-3 bg-accent">
          <IoIosAdd size={24} />
        </button>
      </form>
    </div>
  );
};

export default TaskGroupList;
