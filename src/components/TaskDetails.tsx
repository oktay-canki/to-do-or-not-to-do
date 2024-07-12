import { IoIosAdd } from "react-icons/io";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { GrAttachment } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useTaskDetailsStore } from "../stores/taskDetailsStore";

const TaskDetails = () => {
  const { isVisible, hideDetails } = useTaskDetailsStore();

  return (
    <div
      className={`${
        !isVisible && "hidden"
      } absolute w-full flex lg:w-fit lg:static`}
    >
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
        <div className="flex items-center">
          <input type="checkbox" />
          <Input
            type="text"
            className="bg-transparent hover:bg-primary focus:bg-primary py-2 px-1 ml-1 text-xl"
            value={"Selected task title dsad as dasd as ds"}
          />
        </div>
        <form className="flex items-center mt-1">
          <label>
            <IoIosAdd size={24} />
          </label>
          <Input
            type="text"
            className="bg-transparent h-12 px-1 rounded-none"
            placeholder="Add a step"
          />
        </form>
        <form className="mt-4">
          <Input type="date" label="Due Date" />
          <div className="mt-4">
            <label className="mt-4">Description</label>
            <textarea className="w-full h-32 bg-primary rounded-md p-4 mt-2 outline-none"></textarea>
          </div>
        </form>
        <form>
          <Button className="w-full flex items-center rounded-md mt-4 gap-2">
            <GrAttachment size={24} /> Add File
          </Button>
        </form>
      </aside>
    </div>
  );
};

export default TaskDetails;
