export function weatherCard(props) {
  const container = document.querySelector("#current");
  const date = new Date(props.location.localtime).toDateString();
  container.innerHTML = `
  <!-- component -->
<div class="min-h-screen flex items-center justify-center">
<div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
						<div class="font-bold text-xl">${props.location.name}</div>
						<div class="text-sm text-gray-500">${date}</div>
						<div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                            <img src="${props.current.condition.icon}" alt="${props.current.condition.text} weather icon" class="w-32 h-32">
						</div>
						<div class="flex flex-row items-center justify-center mt-6">
							<div class="font-medium text-6xl">${props.current.temp_c}°</div>
							<div class="flex flex-col items-center ml-6">
								<div>${props.current.condition.text}</div>
								<div class="mt-1">
									<span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
									<span class="text-sm font-light text-gray-500">${props.current.temp_c}°C</span>
								</div>
								<div>
									<span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
									<span class="text-sm font-light text-gray-500">20°C</span>
								</div>
							</div>
						</div>
						<div class="flex flex-row justify-between mt-6">
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Wind</div>
								<div class="text-sm text-gray-500">${props.current.wind_kph} km/h</div>
							</div>
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Humidity</div>
								<div class="text-sm text-gray-500">${props.current.humidity}%</div>
							</div>
							<div class="flex flex-col items-center">
								<div class="font-medium text-sm">Visibility</div>
								<div class="text-sm text-gray-500">${props.current.vis_km}km</div>
							</div>
						</div>
					</div>
</div>

  `;
}

export function weatherForecastCard(props) {
  const container = document.querySelector("#forecast");
  container.innerHTML = `
  <div class="max-w-md p-8 mx-auto mt-16 rounded-lg bg-slate-100 text-gray-800 border shadow-md">
	<div class="flex justify-between space-x-8">
		<div class="flex flex-col items-center">
			<img src="${props.current.condition.icon}">
			<h1 class="text-xl font-semibold">${props.location.name}</h1>
		</div>
		<span class="font-bold text-8xl">${props.current.temp_c}°</span>
	</div>
	<div class="flex justify-between mt-8 space-x-4 text-gray-600">
        ${props.forecast.forecastday.map((day) => weatherForecastItem(day)).join("")}
	</div>
</div>
  `;
}
export function weatherForecastItem(props) {
  const date = new Date(props.date).toDateString().split(" ")[0];
  console.log(date);
  return `
    <div class="flex flex-col items-center space-y-1">
			<span class="uppercase">${date}</span>
            <img src="${props.day.condition.icon}" alt="${props.day.condition.icon} weather icon">
			<span>${props.day.avgtemp_c}°</span>
		</div>
    `;
}
