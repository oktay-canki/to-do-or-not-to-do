import Sidebar from "../components/Sidebar";
import TaskDetails from "../components/TaskDetails";
import TaskGroupView from "../components/TaskGroupView";
import { useTaskGroupStore } from "../stores/taskGroupStore";

const Home = () => {
  const { selectedTaskGroup } = useTaskGroupStore();
  return (
    <div className="flex h-dvh">
      <Sidebar />
      {
        selectedTaskGroup && (
          <TaskGroupView />
        ) /* TODO: create a task group view skeleton */
      }
      <TaskDetails />
    </div>
  );
};

export default Home;
