import React from "react";
import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";

import { Alert } from "react-bootstrap";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Link,
} from "@mui/material";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  // Fetch notes from db
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // Fetches user credentials from local storage if available
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

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

      noteService.setToken(loggedInUser.token);

      setUser(loggedInUser);
      setUsername("");
      setPassword("");
      setNotification(`Hello ${username}`);
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    noteService.setToken(null);
    setUser(null);
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  // // Function to toggle important of a note
  // const toggleImportanceOf = async (id) => {
  //   const note = notes.find((n) => n.id === id);
  //   const changedNote = { ...note, important: !note.important };

  //   try {
  //     const returnedNote = await noteService.update(id, changedNote);
  //     setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
  //   } catch (error) {
  //     setErrorMessage(`Note '${note.content}' was already removed from server`);
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //     setNotes(notes.filter((note) => note.id !== id));
  //   }
  // };

  // Filter notes to show
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <Container>
      {errorMessage && <Notification message={errorMessage} />}
      {notification && <Alert variant="success">{notification}</Alert>}

      <h1>Notes</h1>

      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <h2>Notes</h2>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notesToShow.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>{note.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h4>
        <i>
          Note app, Department of Computer Science, University of Helsinki 2023
        </i>
      </h4>
    </Container>
  );
};

export default App;
