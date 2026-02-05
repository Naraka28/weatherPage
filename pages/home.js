import { getForecastWeather } from "../services/weather.service.js";
import { weatherForecastCard } from "../ui/weatherCard.js";

export async function renderHomePage() {
  const form = document.querySelector("#searchForm");
  const input = document.querySelector("#searchInput");

  const city = await getForecastWeather();
  weatherForecastCard(city);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (!city) return;

    try {
      const data = await getForecastWeather(city);
      console.log(data);

      weatherForecastCard(data);
    } catch (err) {
      alert("Could not fetch weather");
      console.error(err);
    }
  });
}
