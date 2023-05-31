import React from "react";

const SignUpForm = ({
  handleSubmit,
  name,
  handleNameChange,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          name="Name"
          onChange={handleNameChange}
        ></input>
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
