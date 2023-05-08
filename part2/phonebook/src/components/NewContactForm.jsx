import React from "react";

const NewContactForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <div>
          Name: <input onChange={props.onNameChange}></input>
        </div>
        <div>
          Number: <input onChange={props.onNumberChange}></input>
        </div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default NewContactForm;
