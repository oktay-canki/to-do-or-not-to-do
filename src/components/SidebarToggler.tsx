import { useSidebarContext } from "../hooks/useSidebarContext";
import Button from "./ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";

const SidebarToggler = () => {
  const { toggleSidebar } = useSidebarContext();

  return (
    <Button className="w-fit rounded-sm lg:hidden" onClick={toggleSidebar}>
      <RxHamburgerMenu size={24} />
    </Button>
  );
};

export default SidebarToggler;
