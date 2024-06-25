import { ReactNode, createContext, useState } from "react";

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  hideSidebar: () => void;
  showSidebar: () => void;
}

// Create the context with a default value
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const hideSidebar = () => {
    setSidebarVisible((prev) => false);
  };

  const showSidebar = () => {
    setSidebarVisible((prev) => true);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarVisible, toggleSidebar, hideSidebar, showSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
