import { useSidebarContext } from "../hooks/useSidebarContext";
import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";
import TaskGroupList from "./TaskGroupList";
import Button from "./ui/Button";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const { isSidebarVisible, hideSidebar } = useSidebarContext();

  return (
    <div
      className={`${
        !isSidebarVisible && "hidden"
      } absolute w-full lg:flex lg:w-fit lg:static`}
    >
      <aside
        className={`${
          !isSidebarVisible && "hidden"
        } bg-bg absolute flex flex-col w-10/12 md:w-8/12 h-dvh border-white border-r-2 lg:flex lg:static lg:border-0 lg:w-80`}
      >
        <Button
          className="w-fit ml-auto bg-transparent px-3 py-1 lg:hidden"
          onClick={hideSidebar}
        >
          <IoClose size={30} />
        </Button>
        <ProfileAvatar className="mb-4" />
        <SearchForm className="mb-8" />
        <TaskGroupList />
      </aside>
      <div
        className="bg-black absolute w-2/12 md:w-4/12 h-dvh right-0 opacity-55 lg:hidden"
        onClick={hideSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
