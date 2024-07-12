import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";
import TaskGroupList from "./TaskGroupList";
import Button from "./ui/Button";
import { IoClose } from "react-icons/io5";
import AddTaskGroupForm from "./forms/AddTaskGroupForm";
import { useSidebarStore } from "../stores/sidebarStore";

const Sidebar = () => {
  const { isVisible, hideSidebar } = useSidebarStore();

  return (
    <div
      className={`${
        !isVisible && "hidden"
      } absolute w-full lg:flex lg:w-fit lg:static`}
    >
      <aside
        className={`${
          !isVisible && "hidden"
        } bg-secondary absolute flex flex-col w-10/12 md:w-8/12 h-dvh border-white border-r-2 lg:flex lg:static lg:border-0 lg:w-80`}
      >
        <Button
          className="w-fit ml-auto bg-transparent px-3 py-1 lg:hidden"
          onClick={hideSidebar}
        >
          <IoClose size={30} />
        </Button>
        <ProfileAvatar className="mb-6" />
        <SearchForm className="mb-8" />
        <TaskGroupList />
        <AddTaskGroupForm />
      </aside>
      <div
        className="bg-black absolute w-2/12 md:w-4/12 h-dvh right-0 opacity-55 lg:hidden"
        onClick={hideSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
