import { SET } from "./actionTypes";

var initialState = {};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, lang: action.payload.lang };
    default:
      return state;
  }
};

export default GeneralReducer;
