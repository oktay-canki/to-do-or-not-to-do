import Sidebar from "../components/Sidebar/Sidebar";
import SidebarToggler from "../components/Sidebar/SidebarToggler";
import TaskDetails from "../components/TaskDetails";
import TaskGroupView from "../components/TaskGroup/TaskGroupView";
import TaskGroupViewLanding from "../components/TaskGroup/TaskGroupViewLanding";
import { useSidebarStore } from "../stores/sidebarStore";
import { useTaskDetailsStore } from "../stores/taskDetailsStore";
import { useTaskGroupStore } from "../stores/taskGroupStore";

const Home = () => {
  const { isVisible: sidebarVisible } = useSidebarStore();
  const { isVisible, selectedTask } = useTaskDetailsStore();
  const { selectedTaskGroup } = useTaskGroupStore();
  return (
    <div className="flex h-dvh">
      <Sidebar />
      {selectedTaskGroup ? <TaskGroupView /> : <TaskGroupViewLanding />}
      {isVisible && selectedTask && <TaskDetails />}
    </div>
  );
};

export default Home;
