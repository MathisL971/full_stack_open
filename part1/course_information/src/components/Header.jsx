import React from "react";

const Header = ({ name }) => {
  console.log("Header mounted...");
  console.log(name);

  return <h2>{name}</h2>;
};

export default Header;
