import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../main";
import createNewUserDocument from "./createNewUserDocument";
import { doc, getDoc } from "firebase/firestore";
import { firebaseErrorMessage, isRequestError } from "../../../utils/main";
import { toast } from "react-toastify";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const username = user.email
        ? user.email.split("@")[0]
        : user.displayName
        ? user.displayName.replace(/\s+/g, "").toLowerCase()
        : `user_${user.uid.substring(0, 6)}`;

      await createNewUserDocument(user.uid, username, user.email);
    }

    return user;
  } catch (error) {
    if (isRequestError(error)) {
      toast.error(firebaseErrorMessage(error));
    } else {
      toast.error("An unknown error occurred.");
    }
    console.log(error);
  }

  return null;
};

export default signInWithGoogle;
