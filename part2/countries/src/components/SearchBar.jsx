import React from "react";

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      <b>
        Find Countries <input onChange={handleChange}></input>
      </b>
    </div>
  );
};

export default SearchBar;
