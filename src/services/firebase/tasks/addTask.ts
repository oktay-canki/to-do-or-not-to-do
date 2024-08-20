import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../main";
import fetchNumTasks from "./fetchNumTasks";

const addTask = async (uid: string, taskGroupId: string, title: string) => {
  const taskCount = await fetchNumTasks(uid, taskGroupId);
  const taskCollection = collection(
    db,
    "users",
    uid,
    "taskGroups",
    taskGroupId,
    "tasks"
  );
  const newTaskRef = await addDoc(taskCollection, {
    title,
    userId: uid,
    taskOrder: taskCount + 1,
    createdAt: serverTimestamp(),
  });
  return newTaskRef;
};

export default addTask;
