import { doc, updateDoc } from "firebase/firestore";
import { db } from "../main";

const updateTaskGroupTitle = async (
  uid: string,
  tgId: string,
  newTitle: string
) => {
  const taskGroupRef = doc(db, `users/${uid}/taskGroups/${tgId}`);
  await updateDoc(taskGroupRef, { title: newTitle });
};

export default updateTaskGroupTitle;
