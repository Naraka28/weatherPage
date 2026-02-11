import { getForecastWeather } from "../services/weather.service.js";
import { weatherForecastCard } from "../ui/weatherCard.js";

export async function renderHomePage() {
  const form = document.querySelector("#searchForm");
  const input = document.querySelector("#searchInput");
  const errorSpan = document.querySelector("#errorMessage");

  const city = await getForecastWeather();
  weatherForecastCard(city);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();

    if (!city) return;

    // Limpiar mensaje de error previo
    errorSpan.textContent = "";
    errorSpan.classList.add("hidden");

    try {
      const data = await getForecastWeather(city);
      weatherForecastCard(data);
    } catch (err) {
      console.error(err);
      errorSpan.textContent = err.message || "No se pudo obtener el clima.";
      errorSpan.classList.remove("hidden");
    }
  });
}
