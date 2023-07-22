import loginService from "../services/login";
import signupService from "../services/signup";
import blogService from "../services/blogs";

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_EXISTING":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        error: null,
      };
    case "FAILURE":
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const loginAction = (username, password) => async (dispatch) => {
  try {
    const loggedInUser = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem(
      "loggedNoteappUser",
      JSON.stringify(loggedInUser)
    );
    blogService.setToken(loggedInUser.token);

    dispatch({ type: "LOGIN_SUCCESS", payload: loggedInUser });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const existingLoginAction = (loggedUser) => (dispatch) => {
  try {
    blogService.setToken(loggedUser.token);
    dispatch({ type: "LOGIN_EXISTING", payload: loggedUser });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const signupAction = (newUser) => async (dispatch) => {
  try {
    const signedUpUser = await signupService.signup(newUser);
    window.localStorage.setItem(
      "loggedNoteappUser",
      JSON.stringify(signedUpUser)
    );
    blogService.setToken(signedUpUser.token);
    dispatch({ type: "SIGNUP_SUCCESS", payload: signedUpUser });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const logoutAction = () => (dispatch) => {
  try {
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    dispatch({ type: "LOGOUT" });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export default userReducer;
