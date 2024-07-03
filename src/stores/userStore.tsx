import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../services/firebase/main";

type User = {
  id: string;
  email: string;
  username: string;
};

interface UserState {
  currentUser: null | User;
  isLoading: boolean;
  fetchUserInfo: (uid: string | null) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string | null) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() as User, isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
