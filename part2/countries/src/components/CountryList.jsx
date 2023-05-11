import React from "react";

const CountryList = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <p key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={() => handleClick(country.name.common)}>
              Show
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default CountryList;
