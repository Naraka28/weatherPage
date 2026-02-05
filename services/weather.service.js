const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "00d2109aba16468c954174004260402";

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

export async function getForecastWeather(search = "Huatabampo", days = 6) {
  const response = await fetch(
    `${baseUrl}/forecast.json?key=${apiKey}&q=${search}&days=${days}`,
  );
  if (!response.ok) {
    console.log(response.error.message);
  }
  const data = await response.json();
  return data;
}
