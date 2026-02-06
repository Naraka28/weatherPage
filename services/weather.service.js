const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "00d2109aba16468c954174004260402";

const circuit = {
  state: "CLOSED",
  failureCount: 0,
  successCount: 0,
  nextTry: 0,
};

const FAILURE_THRESHOLD = 3;
const SUCCESS_THRESHOLD = 1;
const TIMEOUT = 10000;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function fetchWithRetry(url, options = {}, retries = 3, delay = 500) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("HTTP error");

    return res;
  } catch (err) {
    if (retries === 0) throw err;

    await sleep(delay);

    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
}

async function circuitFetch(url) {
  if (circuit.state === "OPEN") {
    if (Date.now() > circuit.nextTry) {
      circuit.state = "HALF_OPEN";
    } else {
      throw new Error("Circuit breaker OPEN");
    }
  }

  try {
    const response = await fetchWithRetry(url, {}, 3, 500);

    if (circuit.state === "HALF_OPEN") {
      circuit.successCount++;

      if (circuit.successCount >= SUCCESS_THRESHOLD) {
        circuit.state = "CLOSED";
        circuit.failureCount = 0;
        circuit.successCount = 0;
      }
    }

    return response;
  } catch (err) {
    circuit.failureCount++;

    if (circuit.failureCount >= FAILURE_THRESHOLD) {
      circuit.state = "OPEN";
      circuit.nextTry = Date.now() + TIMEOUT;
      console.warn("Circuit breaker OPEN");
    }

    throw err;
  }
}

export async function getForecastWeather(search = "Huatabampo", days = 6) {
  const url = `${baseUrl}/forecast.json?key=${apiKey}&q=${search}&days=${days}`;

  const response = await circuitFetch(url);
  return await response.json();
}

export async function getCurrentWeather(search = "Hermosillo") {
  const url = `${baseUrl}/current.json?key=${apiKey}&q=${search}`;

  const response = await circuitFetch(url);
  return await response.json();
}
