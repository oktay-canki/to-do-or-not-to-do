import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const fetchNumTasks = async (
  uid: string,
  taskGroupId: string
): Promise<number> => {
  const taskCollectionRef = collection(
    db,
    "users",
    uid,
    "taskGroups",
    taskGroupId,
    "tasks"
  );
  const snapshot = await getDocs(taskCollectionRef);
  return snapshot.size;
};

export default fetchNumTasks;
