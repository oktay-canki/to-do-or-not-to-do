import { GrAttachment } from "react-icons/gr";
import Button from "../ui/Button";

const TaskFileForm = () => {
  return (
    <form>
      <Button className="w-full flex items-center rounded-md mt-4 gap-2">
        <GrAttachment size={24} /> Add File
      </Button>
    </form>
  );
};

export default TaskFileForm;
