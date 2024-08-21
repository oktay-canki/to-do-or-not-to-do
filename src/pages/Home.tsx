import Sidebar from "../components/Sidebar/Sidebar";
import TaskDetails from "../components/TaskDetails";
import TaskGroupView from "../components/TaskGroup/TaskGroupView";
import { useTaskDetailsStore } from "../stores/taskDetailsStore";
import { useTaskGroupStore } from "../stores/taskGroupStore";

const Home = () => {
  const { isVisible, selectedTask } = useTaskDetailsStore();
  const { selectedTaskGroup } = useTaskGroupStore();
  return (
    <div className="flex h-dvh">
      <Sidebar />
      {
        selectedTaskGroup && (
          <TaskGroupView />
        ) /* TODO: create a task group view skeleton */
      }
      {isVisible && selectedTask && <TaskDetails />}
    </div>
  );
};

export default Home;
