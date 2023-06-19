import { atom } from "recoil";

export const dogsState = atom({
    key: 'dogs-state', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });