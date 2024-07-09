import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../main";
import fetchNumTaskGroups from "./fetchNumTaskGroups";

const addTaskGroup = async (uid: string, title: string) => {
  const groupCount = await fetchNumTaskGroups(uid);
  const userTaskGroupsRef = collection(db, "users", uid, "taskGroups");
  const newTaskGroupRef = await addDoc(userTaskGroupsRef, {
    title,
    userId: uid,
    groupOrder: groupCount + 1,
    createdAt: serverTimestamp(),
  });
  return newTaskGroupRef;
};

export default addTaskGroup;
