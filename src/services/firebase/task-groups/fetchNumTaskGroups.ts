import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const fetchNumTaskGroups = async (uid: string): Promise<number> => {
  const userTaskGroupsRef = collection(db, "users", uid, "taskGroups");
  const snapshot = await getDocs(userTaskGroupsRef);
  return snapshot.size;
};

export default fetchNumTaskGroups;
