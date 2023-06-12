import React from "react";
import PropTypes from "prop-types";

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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
