import { createStore } from "redux";
import rootReducer from "./Reducers/Root";

const store = createStore(rootReducer);

export default store;
