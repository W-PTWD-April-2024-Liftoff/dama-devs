import React, { useState } from "react";
import styles from "./Forecast.module.css";

const Forecast = () => {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
 
  const getForecast = async () => {
    if (!city) {
      alert("Please enter a city name or zip code");
      return;
    }
    
    try {
      let url;
      if (/^\d{5}$/.test(city)) {  // Checks if input is a 5-digit zip code
        url = `http://localhost:8080/weather/forecast/zip?zip=${city}`;
      } else {
        url = `http://localhost:8080/weather/forecast?city=${city}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod !== "200") {
        alert("Location not found. Please enter a valid city name or ZIP code.");
        return;
      }
  
      setCity(data.city.name); // Now correctly gets the city name
  
      // Process forecast data...
      const dailyForecast = [];
      const seenDates = new Set();
  
      data.list.forEach((item) => {
        const dateObj = new Date(item.dt * 1000);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
  
        if (!seenDates.has(formattedDate) && item.dt_txt.includes("12:00:00")) {
          seenDates.add(formattedDate);
          dailyForecast.push({
            date: formattedDate,
            tempHigh: Math.round(item.main.temp_max),
            tempLow: Math.round(item.main.temp_min),
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          });
        }
      });
  
      setForecastData(dailyForecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please try again.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {  // Check if the pressed key is 'Enter'
      getForecast();
    }
  };
  
  

  return (
    <div className={styles.forecastContainer}>
      <h3>5-Day Forecast</h3>
      {/* Display city name if forecastData exists */}
      {forecastData.length > 0 && <h4 className={styles.cityName}>{city}</h4>}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchButton} onClick={getForecast}>Get Forecast</button>

      {forecastData.length > 0 && (
        <div className={styles.forecastList}>
          {forecastData.map((item, index) => (
            <div key={index} className={styles.forecastItem}>
              <span className={styles.date}>{item.date}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.description}
                className={styles.forecastIcon}
              />
              <span className={styles.tempHigh}>{item.tempHigh}°F</span>
              <span className={styles.tempLow}>{item.tempLow}°F</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;