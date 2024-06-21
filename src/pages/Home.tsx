import Sidebar from "../components/Sidebar";
import LoggedInLayout from "./layouts/logged-in";

const Home = () => {
  return (
    <LoggedInLayout>
      <div className="flex w-full h-dvh">
        <Sidebar />
      </div>
    </LoggedInLayout>
  );
};

export default Home;
