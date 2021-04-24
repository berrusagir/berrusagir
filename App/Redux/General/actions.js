import { SET } from "./actionTypes";

export function set(data) {
  return {
    type: SET,
    payload: {
      data,
    },
  };
}
