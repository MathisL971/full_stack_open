import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  console.log("Content component mounted...");

  console.log(parts);

  return (
    <div>
      {parts.map(({ name, exercises, id }) => {
        console.log("Inside Content mapping...");
        console.log(name);
        console.log(exercises);
        console.log(id);
        return <Part key={id} name={name} exercises={exercises} />;
      })}
    </div>
  );
};

export default Content;
