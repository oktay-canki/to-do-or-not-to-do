import Sidebar from "../components/Sidebar";
import TaskDetails from "../components/TaskDetails";
import TasksGroupView from "../components/TasksGroupView";
import LoggedInLayout from "./layouts/logged-in";

const Home = () => {
  return (
    <LoggedInLayout>
      <div className="flex h-dvh">
        <Sidebar />
        <TasksGroupView />
        <TaskDetails />
      </div>
    </LoggedInLayout>
  );
};

export default Home;
