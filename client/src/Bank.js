import { create } from "zustand";

export const Bank = create((set) => ({
  filename: [],
  setAnswer: (value) => {
    set({ answer: value });
  },

}));