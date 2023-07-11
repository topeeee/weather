import axios from 'axios';
import {apiHelper} from '../utils/apiHelper';

const baseUrl = 'https://api.weatherapi.com/v1';
const API_KEY = 'b116aa8431d84bc6a6b125902231007';

const getCurrentWeather = (
  city: string,
  latitude: number,
  longitude: number,
) => {
  let url = `${baseUrl}/current.json?key=${API_KEY}&q=`;
  if (city) {
    url += `${city}&`;
  }
  url += `${latitude},${longitude}`;

  return apiHelper(axios.get(url));
};

const getWeatherForecast = (latitude: number, longitude: number) => {
  return apiHelper(
    axios.get(
      `${baseUrl}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5`,
    ),
  );
};

export {getCurrentWeather, getWeatherForecast};
