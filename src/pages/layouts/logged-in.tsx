import { SidebarProvider } from "../../contexts/SidebarContext";
import { Navigate, Outlet } from "react-router-dom";
import { TaskDetailsProvider } from "../../contexts/TaskDetailsContext";

const LoggedInLayout = () => {
  const isAuthenticated = false; // mock for testing purposes

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/out/login" />;
  }

  return (
    <SidebarProvider>
      <TaskDetailsProvider>
        <div className="flex flex-col min-h-dvh">{<Outlet />}</div>
      </TaskDetailsProvider>
    </SidebarProvider>
  );
};

export default LoggedInLayout;
