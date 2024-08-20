import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../main";
import Task from "../../../types/Task";

const fetchTasks = async (
  uid: string,
  taskGroupId: string
): Promise<Task[]> => {
  const taskGroupCollection = collection(
    db,
    "users",
    uid,
    "taskGroups",
    taskGroupId,
    "tasks"
  );
  const q = query(taskGroupCollection);
  const querySnapshot = await getDocs(q);
  const fetchedTasks: Task[] = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Task)
  );
  return fetchedTasks;
};

export default fetchTasks;
