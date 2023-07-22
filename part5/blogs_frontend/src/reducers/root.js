import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import notificationReducer from "./notification";
import userReducer from "./user";
import blogsReducer from "./blogs";

const rootReducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
