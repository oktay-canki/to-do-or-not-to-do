import { doc, setDoc } from "firebase/firestore";
import { db } from "../main";
import { strOrNull } from "../../../types/common";

const createNewUserDocument = async (
  uid: string,
  username: string,
  email: strOrNull
) => {
  await setDoc(doc(db, "users", uid), {
    id: uid,
    username: username,
    email: email,
  });
};

export default createNewUserDocument;
