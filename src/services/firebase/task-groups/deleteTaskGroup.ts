import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";

const deleteTaskGroup = async (uid: string, tgId: string) => {
  const taskGroupDoc = doc(db, `users/${uid}/taskGroups/${tgId}`);
  await deleteDoc(taskGroupDoc);
};

export default deleteTaskGroup;
