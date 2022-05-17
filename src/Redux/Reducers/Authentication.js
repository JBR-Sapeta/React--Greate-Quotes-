import { getLocalStorageAuthData } from "../../Helpers/LocalStorageActions";






const initialState = getLocalStorageAuthData();


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        idToken: action.idToken,
        expiresIn: action.expiresIn,
        userId: action.userId,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        idToken: "",
        expiresIn:"",
        userId: "",
        nick: "",
      };

      case "NICK":
      return {
        ...state,
        nick:action.nick,
      };

    default:
      return state;
  }
};

export default authReducer;
