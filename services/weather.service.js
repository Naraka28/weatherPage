const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "abaa09bd08b44b18b5835616260402";

export async function getCurrentWeather(search) {
  const response = await fetch(
    `${baseUrl}/forecast.json?key=${apiKey}&q=Hermosillo`,
  );

  if (!response.ok) {
    console.log(response.error.message);
  }
  const data = await response.json();
  return data;
}

export async function getForecastWeather(search = "Hermosillo", days = 5) {
  const response = await fetch(
    `${baseUrl}/forecast.json?key=${apiKey}&q=${search}&days=${days}`,
  );
  if (!response.ok) {
    console.log(response.error.message);
  }
  const data = await response.json();
  return data;
}
