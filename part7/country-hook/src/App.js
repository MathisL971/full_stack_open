import React from "react";
import { useField } from "./hooks";
import { useState, useEffect, useRef } from "react";
import Country from "./components/Country";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const lcName = name.toLowerCase();
    axios
      .get(`${baseUrl}/${lcName}`)
      .then((res) => {
        if (res.data) {
          setCountry({
            data: res.data,
            found: true,
            error: null,
            isLoading: false,
          });
        }
      })
      .catch((e) => {
        console.log(e.message);
        setCountry({
          data: null,
          found: false,
          error: "Country not found",
          isLoading: false,
        });
      });
  }, [name]);

  return country;
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
