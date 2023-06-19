import { atom } from "recoil";

export const breedState = atom({
    key: 'breed-state', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });