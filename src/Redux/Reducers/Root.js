import { combineReducers } from "redux";

import authReducer from "./Authentication";


const rootReducer = combineReducers({
  auth: authReducer,
 
});

export default rootReducer;
