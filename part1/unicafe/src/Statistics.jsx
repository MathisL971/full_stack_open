import React from "react";

const Statistics = ({ name, value }) => {
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

export default Statistics;
