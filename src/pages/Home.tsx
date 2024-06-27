import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import TaskDetails from "../components/TaskDetails";
import TasksGroupView from "../components/TasksGroupView";

const Home = () => {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <TasksGroupView />
      <TaskDetails />
    </div>
  );
};

export default Home;
