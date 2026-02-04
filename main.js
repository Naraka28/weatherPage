import {
  getCurrentWeather,
  getForecastWeather,
} from "./services/weather.service.js";
import { weatherCard, weatherForecastCard } from "./ui/weatherCard.js";

// const weather = await getCurrentWeather();
// weatherCard(weather);

const weather = await getForecastWeather();
weatherForecastCard(weather);
