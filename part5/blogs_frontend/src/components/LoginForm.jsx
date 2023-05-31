import React from "react";

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
