import React, { useState } from "react";
import "../custom-css/PlantCard.css";
import { Link } from "react-router-dom";

//get plant and gardenId from PlantSearch and pass as props
function PlantCard({ plant, gardenId }) {
  const [inGarden, setInGarden] = useState(false);

  //on ADD TO GARDEN button click, POST request at "/{gardenId}/add-plants/{plantId}"
  async function handleAddPlantToGardenClick() {
    const plantId = plant.id;
    const dto = { plant: plant, gardenId: gardenId };
    const token = localStorage.getItem("JWT_TOKEN");
    const csrfToken = localStorage.getItem("CSRF_TOKEN");

    try {
      const response = await fetch(
        `http://localhost:8080/api/garden/${gardenId}/add-plant/${plantId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dto),
          credentials: "include",
        }
      );

      const dtoData = await response.json();
      if (response.ok) {
        setInGarden(dtoData.plantInGarden);
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  }

  return (
    <div className="plantCard">
      <div>
        <Link to={`/plant-details/${plant.id}`}>
          <img
            className="plantCard-image"
            src={`http://localhost:8080/${plant.plantImagePath}`}
            alt={`Picture of ${plant.commonName}`}
          />
          <h2 className="plantCard-title">{plant.commonName}</h2>
          <br></br>
        </Link>
      </div>
      <div>
        <button
          className="plantCard-button"
          onClick={handleAddPlantToGardenClick}
        >
          {inGarden ? "PLANT ADDED!" : "ADD TO GARDEN"}
          {/*  handle submit (in angie's photos) */}
        </button>
      </div>
    </div>
  );
}
export default PlantCard;
