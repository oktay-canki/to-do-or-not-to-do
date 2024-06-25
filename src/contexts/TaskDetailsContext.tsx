import { ReactNode, createContext, useState } from "react";

interface TaskDetailsContextType {
  isDetailsVisible: boolean;
  toggleDetails: () => void;
  hideDetails: () => void;
  showDetails: () => void;
}

export const TaskDetailsContext = createContext<
  TaskDetailsContextType | undefined
>(undefined);

export const TaskDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  const hideDetails = () => {
    setIsDetailsVisible((prev) => false);
  };

  const showDetails = () => {
    setIsDetailsVisible((prev) => true);
  };

  return (
    <TaskDetailsContext.Provider
      value={{ isDetailsVisible, toggleDetails, hideDetails, showDetails }}
    >
      {children}
    </TaskDetailsContext.Provider>
  );
};
