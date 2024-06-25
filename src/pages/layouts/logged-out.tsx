import { Navigate, Outlet } from "react-router-dom";

const LoggedOutLayout = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <div className="flex flex-col min-h-dvh">{<Outlet />}</div>;
};

export default LoggedOutLayout;
