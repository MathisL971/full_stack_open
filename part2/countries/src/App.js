import { useEffect, useState } from "react";
import countryServices from "./services/countries";
import SearchBar from "./components/SearchBar";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    countryServices.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCountryShow = (name) => {
    setSearchInput(name);
  };

  let countriesToRender = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  let body;
  if (countriesToRender.length > 10) {
    body = <p>Too many matches, be more precise with your filtering.</p>;
  } else if (countriesToRender.length === 1) {
    body = <CountryInfo country={countriesToRender[0]}></CountryInfo>;
  } else if (countriesToRender.length === 0) {
    body = <p>No matches were found...</p>;
  } else {
    body = (
      <CountryList
        countries={countriesToRender}
        handleClick={handleCountryShow}
      ></CountryList>
    );
  }

  return (
    <div className="App">
      <h1>Country List</h1>
      <SearchBar handleChange={handleInputChange}></SearchBar>
      {body}
    </div>
  );
}

export default App;
