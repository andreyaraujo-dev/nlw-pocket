import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  imageUrl: string;
};

type Store = {
  user: User;
};

type Action = {
  clear: () => void;
  update: (user: User) => void;
};

export const userStore = create(
  persist<Store & Action>(
    (set) => ({
      user: {
        email: "",
        name: "",
        imageUrl: "",
      },
      update: ({ email, name, imageUrl }) =>
        set(() => ({ user: { email, name, imageUrl } })),
      clear: () => set({ user: { name: "", email: "", imageUrl: "" } }),
    }),
    {
      name: "in-orbit",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
