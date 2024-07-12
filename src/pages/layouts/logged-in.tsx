import { Navigate, Outlet } from "react-router-dom";
import { TaskDetailsProvider } from "../../contexts/TaskDetailsContext";
import Notification from "../../components/Notification";
import { useUserStore } from "../../stores/userStore";
import PageLoading from "../../components/PageLoading";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebase/main";
import { useTaskGroupStore } from "../../stores/taskGroupStore";
import { collection, onSnapshot, query } from "firebase/firestore";
import TaskGroup from "../../types/TaskGroup";
import { sortByGroupOrder } from "../../utils/main";

const LoggedInLayout = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { fetchTaskGroups, setTaskGroups } = useTaskGroupStore();

  useEffect(() => {
    let unSubAuth: (() => void) | undefined;
    let unSubTaskGroups: (() => void) | undefined;

    unSubAuth = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user && user.uid ? user.uid : null);

      if (user && user.uid) {
        const q = query(collection(db, "users", user.uid, "taskGroups"));
        unSubTaskGroups = onSnapshot(q, (snapshot) => {
          try {
            const taskGroupsData = snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as TaskGroup)
            );
            setTaskGroups(sortByGroupOrder(taskGroupsData));
          } catch (error) {
            console.log(error);
          }
        });
      }
    });

    return () => {
      if (unSubAuth) unSubAuth();
      if (unSubTaskGroups) unSubTaskGroups();
    };
  }, [fetchUserInfo]);

  useEffect(() => {
    if (currentUser) fetchTaskGroups(currentUser.id);
  }, [currentUser]);

  if (isLoading) return <PageLoading />;

  if (!currentUser) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/out/login" />;
  }

  return (
    <TaskDetailsProvider>
      <div className="flex flex-col min-h-dvh">
        <Notification />
        <Outlet />
      </div>
    </TaskDetailsProvider>
  );
};

export default LoggedInLayout;
