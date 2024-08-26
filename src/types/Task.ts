import { Timestamp } from "firebase/firestore";

type Task = {
  id: string;
  title: string;
  createdAt: Timestamp;
  description?: string;
  dueDate?: string | null;
  isCompleted?: boolean;
  isImportant?: boolean;
  updatedAt?: Timestamp;
};

export default Task;
