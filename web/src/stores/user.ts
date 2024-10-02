import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type Action = {
  clear: () => void;
  update: (email: string, name: string) => void;
};

export const userStore = create<User & Action>((set) => ({
  email: "",
  name: "",
  update: (email: string, name: string) => set(() => ({ email, name })),
  clear: () => set({ name: "", email: "" }),
}));
