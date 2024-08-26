import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Task from "../../../types/Task";

export const docDataToTaskObject = (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  return {
    id: doc.id,
    ...doc.data(),
  } as Task;
};
