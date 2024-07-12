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
  fetchUserInfo: async (uid) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({
          currentUser: { id: docSnap.id, ...docSnap.data() } as User,
          isLoading: false,
        });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
