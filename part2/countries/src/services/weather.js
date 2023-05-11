import axios from "axios";
const baseUrl = "http://api.weatherapi.com/v1/current.json";
const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (capital) => {
  const request = axios.get(`${baseUrl}?key=${api_key}&q=${capital}&aqi=no`);
  return request.then((response) => response.data);
};

const weatherServices = { getWeather };
export default weatherServices;
