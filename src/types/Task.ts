import { Timestamp } from "firebase/firestore";

type Task = {
  id: string;
  userId: string;
  groupId: string;
  groupOrder: number;
  title: string;
  description: string;
  dueDate: Timestamp;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export default Task;
