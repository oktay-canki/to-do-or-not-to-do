import { collection, getDocs, query } from "firebase/firestore";
import TaskGroup from "../../../types/TaskGroup";
import { db } from "../main";

const fetchUserTaskGroups = async (uid: string): Promise<TaskGroup[]> => {
  const userTaskGroupsRef = collection(db, "users", uid, "taskGroups");
  const q = query(userTaskGroupsRef);
  const querySnapshot = await getDocs(q);
  const fetchedTaskGroups: TaskGroup[] = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as TaskGroup)
  );
  return fetchedTaskGroups;
};

export default fetchUserTaskGroups;
