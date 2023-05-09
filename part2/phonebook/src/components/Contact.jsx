import React from "react";

const Contact = ({ name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

export default Contact;
