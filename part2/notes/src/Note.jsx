import React from "react";

const Note = ({ note }) => {
  console.log("Note component mounted.");
  return <li>{note.content}</li>;
};

export default Note;
