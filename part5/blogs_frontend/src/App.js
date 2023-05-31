import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import signupService from "./services/signup";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import NewBlogForm from "./components/NewBlogForm";
import Toggleble from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const newBlogFormRef = useRef("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const signedUpUser = await signupService.signup({
        name,
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(signedUpUser)
      );

      blogService.setToken(signedUpUser.token);

      setUser(signedUpUser);
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
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(loggedInUser)
      );

      blogService.setToken(loggedInUser.token);

      setUser(loggedInUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle logout
  const handleLogout = async (event) => {
    window.localStorage.removeItem("loggedNoteappUser");
    blogService.setToken(null);
    setUser(null);
  };

  // Add blog
  const addBlog = async (newBlog) => {
    try {
      newBlogFormRef.current.toggleVisibility();
      const addedBlog = await blogService.create(newBlog);
      const updatedBlogs = blogs.concat(addedBlog);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Removing blog "${blogToDelete.title}" by ${blogToDelete.author}. Are you sure?`
      )
    ) {
      try {
        await blogService.toDelete(blogToDelete);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLike = async (blogToLike) => {
    blogToLike.likes++;
    const updatedBlog = await blogService.update(blogToLike);

    setBlogs(
      blogs.map((blog) => {
        return blog.id === updatedBlog.id ? updatedBlog : blog;
      })
    );
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <div>
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
          <NewBlogForm createBlog={addBlog}></NewBlogForm>
        </Toggleble>
      )}

      <br></br>

      {user &&
        sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUser={user}
            handleLike={handleLike}
            handleDelete={deleteBlog}
          />
        ))}

      <br></br>

      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default App;
