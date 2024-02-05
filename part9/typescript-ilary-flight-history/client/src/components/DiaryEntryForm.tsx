import React from "react";
import { useState } from "react";
import { NonSensitiveDiaryEntry } from "../../../src/types";
import diaryService from "../services/diary";
import axios from "axios";

type DiaryEntryFormTypes = {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
};

const DiaryEntryForm = (props: DiaryEntryFormTypes) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();

      const newEntry = {
        date,
        visibility,
        weather,
        comment,
      };

      const addedEntry = await diaryService.create(newEntry);

      props.setEntries((currentEntries) => {
        return currentEntries.concat(addedEntry);
      });
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Add a new flight entry</h1>
      <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      <div>
        <label>
          <b>Date: </b>
        </label>
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        ></input>
      </div>
      <div>
        <label>
          <b>Visibility:</b>
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value={"great"}
            onChange={({ target }) => setVisibility(target.value)}
          ></input>{" "}
          Great
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value={"good"}
            onChange={({ target }) => setVisibility(target.value)}
          ></input>{" "}
          Good
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value={"ok"}
            onChange={({ target }) => setVisibility(target.value)}
          ></input>{" "}
          Ok
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value={"poor"}
            onChange={({ target }) => setVisibility(target.value)}
          ></input>{" "}
          Poor
        </label>
      </div>
      <div>
        <label>
          <b>Weather:</b>
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value={"sunny"}
            onChange={({ target }) => setWeather(target.value)}
          ></input>{" "}
          Sunny
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value={"rainy"}
            onChange={({ target }) => setWeather(target.value)}
          ></input>{" "}
          Rainy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value={"cloudy"}
            onChange={({ target }) => setWeather(target.value)}
          ></input>{" "}
          Cloudy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value={"stormy"}
            onChange={({ target }) => setWeather(target.value)}
          ></input>{" "}
          Stormy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value={"windy"}
            onChange={({ target }) => setWeather(target.value)}
          ></input>{" "}
          Windy
        </label>
      </div>
      <div>
        <label>
          <b>Comment: </b>
        </label>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default DiaryEntryForm;
