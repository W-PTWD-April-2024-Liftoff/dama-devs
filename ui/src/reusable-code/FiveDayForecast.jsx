import React, { useState } from "react";
import styles from "./Forecast.module.css";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudyIcon from "@mui/icons-material/CloudQueue";
import SunnyIcon from "@mui/icons-material/WbSunny";
import RainyIcon from "@mui/icons-material/Grain";
import SnowyIcon from "@mui/icons-material/AcUnit";
import WindIcon from "@mui/icons-material/Waves";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import LightningIcon from "@mui/icons-material/FlashOn";
import FogIcon from "@mui/icons-material/InvertColors";
import { useMyContext } from "../store/ContextApi";
import { useEffect } from "react";

const Forecast = () => {
  const { zipCode } = useMyContext();
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  // const [forecastData, setForecastData] = useState([]);

  //gets new forecast data when zipcode is changed
  useEffect(() => {
    if (zipCode) {
      getForecast();
    }
  }, [zipCode]);

  const getForecast = async () => {
    //validates that zip code even exists
    if (!zipCode) {
      alert("No ZIP code available.");
      return;
    }
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const csrfToken = localStorage.getItem("CSRF_TOKEN");

      const response = await fetch(
        `http://localhost:8080/api/weather/forecast/zip?zip=${zipCode}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.cod !== "200") {
        alert("Location not found. Please enter a valid ZIP code.");
        return;
      }
      const cityName = data.city.name;
      setCity(data.city.name); //  gets the city name from the json returned from the backend openweather

      // Process forecast data...
      const dailyForecast = [];
      const seenDates = new Set();

      //item represents each individual weather data object inthe array
      data.list.forEach((item) => {
        //item.dt represents date and time stamp in weatehr data in seconds so x 1000 to be converted into milliseconds, how it is called in openweatehr
        const dateObj = new Date(item.dt * 1000);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          //english, abbriviations for days/months/dates
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        // Only process the data once per day (e.g., 12:00 PM)
        //This is used to track which dates have already been processed.
        if (!seenDates.has(formattedDate)) {
          seenDates.add(formattedDate);

          //this gets all the max and min temps for each day and maps them into forecast.main.temp
          const tempsForTheDay = data.list
            .filter((forecast) => {
              const forecastDate = new Date(
                forecast.dt * 1000
              ).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return forecastDate === formattedDate;
            })
            .map((forecast) => forecast.main.temp);

          const tempHigh = Math.max(...tempsForTheDay); //all the temps leading up tothis point choosing the max
          const tempLow = Math.min(...tempsForTheDay); //all the temps leading up tothis point choosing the min

          dailyForecast.push({
            date: formattedDate,
            tempHigh: tempHigh !== undefined ? Math.round(tempHigh) : "N/A",
            tempLow: tempLow !== undefined ? Math.round(tempLow) : "N/A",
            icon: item.weather[0].main.toLowerCase(),
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
    if (event.key === "Enter") {
      // Check if the pressed key is 'Enter'
      getForecast();
    }
  };
  //rendering from open-weather-values to material ui values
  const renderIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <SunnyIcon sx={{ color: "yellow" }} />;
      case "clouds":
        return <CloudyIcon sx={{ color: "white" }} />;
      case "rain":
        return <RainyIcon sx={{ color: "#1E88E5" }} />;
      case "drizzle":
        return <UmbrellaIcon sx={{ color: "gray" }} />;
      case "thunderstorm":
        return <LightningIcon sx={{ color: "yellow" }} />;
      case "snow":
        return <SnowyIcon sx={{ color: "white" }} />;
      case "mist":
      case "fog":
      case "smoke":
      case "haze":
      case "dust":
      case "sand":
      case "ash":
        return <FogIcon />;
      case "squall":
      case "tornado":
        return <WindIcon />;
      default:
        return <CloudIcon />; // fallback
    }
  };

  return (
    <div className={styles.forecastContainer}>
      <h3>Extended Forecast for {city}</h3>
      {/* only renders the forecast list if we hve data */}
      {forecastData.length > 0 && (
        <div className={styles.forecastList}>
          {/* loops overs each days' weather in the array item meaning each day */}
          {forecastData.map((item, index) => (
            <div key={index} className={styles.forecastItem}>
              <span className={styles.date}>{item.date}</span>
              {renderIcon(item.icon)}{" "}
              {/* Render the correct icon based on weather */}
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
