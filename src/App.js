
import './App.css';
import { useState } from "react";
import CurrentWeather from './components/current-weather/currentWeather';
import Forecast from "./components/forecast/forecast";
import Search from './components/search/search';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api"
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `https://weatherapi-khn2.onrender.com/api/weather?lat=${lat}&lon=${lon}`
    );
    const forecastFetch = fetch(
      `https://weatherapi-khn2.onrender.com/api/forecast?lat=${lat}&lon=${lon}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
