import React from "react";

const SearchFilter = (props) => {
  return (
    <div>
      Filter contacts: <input onChange={props.onChangeHandler}></input>
    </div>
  );
};

export default SearchFilter;
