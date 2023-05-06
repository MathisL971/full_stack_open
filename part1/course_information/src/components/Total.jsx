import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Number of exercises{" "}
        {parts.reduce(function (sum, part) {
          return sum + part.exercises;
        }, 0)}
      </b>
    </p>
  );
};

export default Total;
