import { combineReducers } from "redux";
import phrase from "../reducers/phase";
import { MarkSettingsReducer } from "../reducers/markSettings";

const reducers = {
  phrase,
  markSettings: MarkSettingsReducer
};
export default combineReducers(reducers);
