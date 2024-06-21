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

  const dragTask = useRef<number>(0);
  const draggedOverTask = useRef<number>(0);

  const handleSort = () => {
    const taskGroupsClone = [...taskGroups];
    const [item] = taskGroupsClone.splice(dragTask.current, 1);
    taskGroupsClone.splice(draggedOverTask.current, 0, item);
    setTaskGroups((prev) =>
      taskGroupsClone.map((taskGroup, idx) => ({ ...taskGroup, order: idx }))
    );
  };

  return (
    <div className={`flex flex-col flex-1 min-h-0 ${className}`}>
      <ul className="flex-1 overflow-y-auto bg-secondary">
        {taskGroups.map((taskGroup, idx) => (
          <li
            key={idx}
            className="flex items-center py-3 px-2 gap-2 cursor-pointer hover:bg-primary"
            draggable
            onDragStart={() => (dragTask.current = idx)}
            onDragEnter={() => (draggedOverTask.current = idx)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <RxDragHandleDots2 size={30} />
            <span className="">{taskGroup.title}</span>
          </li>
        ))}
      </ul>
      <form className="flex bg-secondary h-12">
        <input
          type="text"
          placeholder="Add new task group"
          className="h-12 flex-1 outline-none bg-transparent text-lg px-3 py-1 hover:bg-slate-800"
        />
        <button type="submit" className="h-12 px-3 bg-accent rounded-sm">
          <IoIosAdd size={24} />
        </button>
      </form>
    </div>
  );
};

export default TaskGroupList;
