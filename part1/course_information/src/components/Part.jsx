import React from "react";

const Part = ({ name, exercises }) => {
  console.log("Part component mounted...");
  console.log(name);
  console.log(exercises);

  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
