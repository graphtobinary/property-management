import { create } from "zustand";
import { AuthState } from "../interfaces/auth";

export const useAuthStore = create<AuthState>()((set) => ({
  token: "",
  setToken: (value) => set({ token: value }),
}));
