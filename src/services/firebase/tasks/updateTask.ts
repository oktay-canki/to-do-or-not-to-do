import { doc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import Task from "../../../types/Task";

const updateTask = async (
  uid: string,
  tgId: string,
  task: Task
): Promise<void> => {
  const taskRef = doc(db, `users/${uid}/taskGroups/${tgId}/tasks/${task.id}`);

  const { id, ...taskWithoutId } = task;
  await updateDoc(taskRef, { ...taskWithoutId });
};

export default updateTask;
