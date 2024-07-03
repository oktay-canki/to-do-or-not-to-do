import { Navigate, Outlet } from "react-router-dom";
import Notification from "../../components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/main";
import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import PageLoading from "../../components/PageLoading";

const LoggedOutLayout = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user && user.uid ? user.uid : null);
    });

    return () => unSub();
  }, [fetchUserInfo]);

  if (isLoading) return <PageLoading />;

  if (currentUser) {
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
