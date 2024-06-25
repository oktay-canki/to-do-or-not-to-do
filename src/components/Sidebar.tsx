import { useSidebarContext } from "../hooks/useSidebarContext";
import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";
import TaskGroupList from "./TaskGroupList";
import Button from "./ui/Button";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const { isSidebarVisible, hideSidebar } = useSidebarContext();

  return (
    <aside
      className={`${
        !isSidebarVisible && "hidden"
      } bg-bg absolute flex flex-col w-full lg:w-80 h-dvh border-white border-r-2 lg:flex lg:static lg:border-0`}
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
  );
};

export default Sidebar;
