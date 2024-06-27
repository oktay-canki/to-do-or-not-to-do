import { Navigate, Outlet } from "react-router-dom";
import Notification from "../../components/Notification";

const LoggedOutLayout = () => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <Notification />
      <Outlet />
    </div>
  );
};

export default LoggedOutLayout;
