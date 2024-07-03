import { SidebarProvider } from "../../contexts/SidebarContext";
import { Navigate, Outlet } from "react-router-dom";
import { TaskDetailsProvider } from "../../contexts/TaskDetailsContext";
import Notification from "../../components/Notification";
import { useUserStore } from "../../stores/userStore";
import PageLoading from "../../components/PageLoading";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/main";

const LoggedInLayout = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user && user.uid ? user.uid : null);
    });

    return () => unSub();
  }, [fetchUserInfo]);

  if (isLoading) return <PageLoading />;

  if (!currentUser) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/out/login" />;
  }

  return (
    <SidebarProvider>
      <TaskDetailsProvider>
        <div className="flex flex-col min-h-dvh">
          <Notification />
          <Outlet />
        </div>
      </TaskDetailsProvider>
    </SidebarProvider>
  );
};

export default LoggedInLayout;
