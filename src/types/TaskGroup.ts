import { Timestamp } from "firebase/firestore";

type TaskGroup = {
  id: string;
  userId: string;
  groupOrder: number;
  title: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export default TaskGroup;
