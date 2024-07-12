import { nameInitials } from "../utils/formatters";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { classNames } from "../utils/main";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase/main";
import useCurrentUser from "../hooks/useCurrentUser";

type ProfileAvatarProps = {
  className?: string;
};

const ProfileAvatar = ({ className }: ProfileAvatarProps) => {
  const currentUser = useCurrentUser();

  return (
    <Menu
      as="div"
      className={classNames(className, "relative inline-block text-left")}
    >
      <div>
        <MenuButton className="inline-flex w-full text-left gap-2 justify-evenly px-3 py-4 hover:bg-primary transition-all">
          <span className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-accent rounded-full text-2xl tracking-wide">
            {nameInitials(currentUser.username)}
          </span>
          <div className="flex flex-col min-h-16 flex-1 justify-evenly overflow-hidden">
            <h3 className="text-xl m-0 text-ellipsis overflow-hidden whitespace-nowrap">
              {currentUser.username}
            </h3>
            <span className="text-secondary-text text-ellipsis overflow-hidden whitespace-nowrap">
              {currentUser.email}
            </span>
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-8 z-10 -mt-2 w-56 origin-top-right divide-y divide-white rounded-md bg-bg shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-2">
          <MenuItem>
            {({ focus }) => (
              <Link
                to="/"
                className={classNames(
                  focus && "bg-primary",
                  "block px-4 py-2 text-md"
                )}
              >
                My Account
              </Link>
            )}
          </MenuItem>
        </div>
        <div>
          <MenuItem>
            {({ focus }) => (
              <Button
                onClick={() => auth.signOut()}
                className={classNames(
                  focus && "bg-primary",
                  "flex px-4 py-2 text-md items-center gap-2 rounded-b w-full"
                )}
              >
                <PiSignOutBold size={22} /> Sign Out
              </Button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ProfileAvatar;
