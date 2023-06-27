import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `You voted for '${action.payload}'`;
    case "NEW_ANECDOTE":
      return `You created the following anecdote: '${action.payload}'`;
    case "RESET":
      return "";
    case "TOO_SHORT":
      return "Too short anecdote, must be 5 characters or more";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const objects = useContext(NotificationContext);
  return objects[0];
};

export const useNotificationDispatch = () => {
  const objects = useContext(NotificationContext);
  return objects[1];
};

export default NotificationContext;
