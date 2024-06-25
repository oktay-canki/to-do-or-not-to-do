import { useContext } from "react";
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

const useTaskDetailsContext = () => {
  const context = useContext(TaskDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useTaskDetailsContext must be used within a TaskDetailsProvider"
    );
  }

  return context;
};

export default useTaskDetailsContext;
