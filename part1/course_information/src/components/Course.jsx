import React from "react";
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = (props) => {
  const { name, parts } = props.course;

  console.log("Course mounted");
  console.log(name);
  console.log(parts);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
