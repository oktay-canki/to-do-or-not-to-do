import { useSidebarStore } from "../../stores/sidebarStore";
import Button from "../ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";

const SidebarToggler = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <Button className="w-fit rounded-sm lg:hidden" onClick={toggleSidebar}>
      <RxHamburgerMenu size={24} />
    </Button>
  );
};

export default SidebarToggler;
