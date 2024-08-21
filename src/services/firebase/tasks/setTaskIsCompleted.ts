import { doc, updateDoc } from "firebase/firestore";
import { db } from "../main";

const setIsCompletedTask = async (
  uid: string,
  tgId: string,
  tId: string,
  value: boolean
) => {
  const taskGroupRef = doc(db, `users/${uid}/taskGroups/${tgId}/tasks/${tId}`);
  await updateDoc(taskGroupRef, { isCompleted: value });
};

export default setIsCompletedTask;
