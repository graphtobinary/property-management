import { UserStoreProps } from "../interfaces/user";
import { create } from "zustand";

const userStoreInitialValue = {
  user: null,
};

const useUserStore = create<UserStoreProps>((set) => ({
  ...userStoreInitialValue,
  setUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
  clearUserStore: () => set(userStoreInitialValue),
}));

export default useUserStore;
