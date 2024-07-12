import { useUserStore } from "../stores/userStore";

const useCurrentUser = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) throw new Error("Current user is not available");

  return currentUser;
};

export default useCurrentUser;
