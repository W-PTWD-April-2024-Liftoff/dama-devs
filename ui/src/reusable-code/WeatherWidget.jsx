import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WeatherWidget.module.css";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const location = "Saint Louis"; // Default location, this locatio will eventually be adjusted to whatever the user enters for a city

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/weather/current?city=${location}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className={styles.weatherWidget}>
      {weatherData ? (
        <div className={styles.weatherContent}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className={styles.weatherIcon}
          />
          <div>
            <h3 className={styles.city}>{weatherData.name}</h3>
            <p className={styles.temp}>{Math.round(weatherData.main.temp)}°F</p>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherWidget;