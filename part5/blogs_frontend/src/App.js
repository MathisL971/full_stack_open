// Libraries
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import NewBlogForm from "./components/NewBlogForm";
import Toggleble from "./components/Togglable";

import {
  loginAction,
  signupAction,
  logoutAction,
  existingLoginAction,
} from "./reducers/user";
import { blogFetchAction } from "./reducers/blogs";

const App = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notification = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.user);
  const { blogs } = useSelector((state) => state.blogs);

  const newBlogFormRef = useRef("");

  // Fetch blogs
  useEffect(() => {
    dispatch(blogFetchAction());
  }, []);

  // Log in user if already appears in session storage
  useEffect(() => {
    const loggedUser = JSON.parse(
      window.localStorage.getItem("loggedNoteappUser")
    );
    if (loggedUser) {
      dispatch(existingLoginAction(loggedUser));
    }
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      dispatch(signupAction({ name, username, password }));
      setName("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginAction(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <div>
      {notification && <div>{notification}</div>}

      <h2 className="content-center">Blogs List</h2>

      {user && <p>{user.username} is logged in!</p>}

      {!user && (
        <Toggleble buttonLabel="Log In">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => {
              setUsername(target.value);
            }}
            handlePasswordChange={({ target }) => {
              setPassword(target.value);
            }}
          ></LoginForm>
        </Toggleble>
      )}
      {!user && (
        <Toggleble buttonLabel="Sign Up">
          <SignUpForm
            handleSubmit={handleSignUp}
            name={name}
            username={username}
            password={password}
            handleNameChange={({ target }) => {
              setName(target.value);
            }}
            handleUsernameChange={({ target }) => {
              setUsername(target.value);
            }}
            handlePasswordChange={({ target }) => {
              setPassword(target.value);
            }}
          ></SignUpForm>
        </Toggleble>
      )}

      {user && (
        <Toggleble buttonLabel="New Note" ref={newBlogFormRef}>
          <NewBlogForm newBlogFormRef={newBlogFormRef}></NewBlogForm>
        </Toggleble>
      )}

      <br></br>

      {user &&
        sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} loggedInUser={user} />
        ))}

      <br></br>

      {user && <button onClick={() => dispatch(logoutAction())}>Logout</button>}
    </div>
  );
};

export default App;
