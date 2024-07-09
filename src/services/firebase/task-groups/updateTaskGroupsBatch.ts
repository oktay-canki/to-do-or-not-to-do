import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import TaskGroup from "../../../types/TaskGroup";
import { db } from "../main";

const updateTaskGroupsBatch = async (
  uid: string,
  updatedTaskGroups: TaskGroup[]
) => {
  const taskGroupsCollectionRef = collection(db, "users", uid, "taskGroups");
  const querySnapshot = await getDocs(taskGroupsCollectionRef);
  const batch = writeBatch(db);

  querySnapshot.forEach((iterDoc) => {
    const taskGroupObj: TaskGroup | undefined = updatedTaskGroups.find(
      (tg) => tg.id === iterDoc.id
    );

    if (taskGroupObj) {
      const taskGroupRef = doc(db, "users", uid, "taskGroups", iterDoc.id);
      batch.update(taskGroupRef, { ...taskGroupObj, id: iterDoc.id });
    }
  });

  await batch.commit();
};

export default updateTaskGroupsBatch;
