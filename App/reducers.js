import GeneralReducer from "./Redux/General/reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  GeneralReducer,
});

export default allReducers;
