import React, { useEffect, useState } from "react";
import weatherServices from "../services/weather";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherServices.getWeather(country.capital).then((weather) => {
      setWeather(weather.current);
    });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <br></br>
      <b>Languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt=""></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.temp_c} Degree Celsius</p>
      <p>Wind: {weather.wind_mph} mph</p>
    </div>
  );
};

export default CountryInfo;
