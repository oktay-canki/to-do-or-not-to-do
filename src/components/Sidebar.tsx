import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";
import TaskGroupList from "./TaskGroupList";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-80 h-dvh">
      <ProfileAvatar className="mt-4 mb-4" />
      <SearchForm className="mb-8" />
      <TaskGroupList />
    </aside>
  );
};

export default Sidebar;
