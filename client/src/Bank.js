/*import { create } from "zustand";

export const Bank = create((set) => ({
  //filename: [],
  filename: "",
  setAnswer: (value) => {
    set({ answer: value });
    console.log("heyy")
    console.log(value)
  },
  setFilename: (filename) => {
    set({ filename });
  },
  getFilename: () => {
    return Bank.getState().filename;
  }
}));*/
let _sharedVariable = 'shared value'; // Private variable

export const setSharedVariable = (value) => {
    _sharedVariable = value;
};

export const getSharedVariable = () => {
    return _sharedVariable;
};