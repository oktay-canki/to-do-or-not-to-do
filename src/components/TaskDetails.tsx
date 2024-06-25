import { IoIosAdd } from "react-icons/io";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { GrAttachment } from "react-icons/gr";

const TaskDetails = () => {
  return (
    <aside className="bg-bg flex-1 max-w-xs px-4 py-4">
      <div className="flex items-center">
        <input type="checkbox" />
        <Input
          type="text"
          className="bg-transparent hover:bg-secondary focus:bg-secondary py-2 px-1 ml-1 text-xl"
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
          <textarea className="w-full h-32 bg-secondary rounded-md p-4 mt-2 outline-none">
            asdasdsd
          </textarea>
        </div>
      </form>
      <form>
        <Button className="w-full flex items-center rounded-md mt-4 gap-2">
          <GrAttachment size={24} /> Add File
        </Button>
      </form>
    </aside>
  );
};

export default TaskDetails;
