import React, { useEffect, useState } from "react";
import "../custom-css/PlantCard.css";
import "../custom-css/PlantDetails.css";
import StarRating from "../reusable-code/StarRating";
import { useParams } from "react-router-dom";

function PlantDetails() {
  const { plantId } = useParams(); //grabs the plantId from the URL.
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchPlant() {
      const response = await fetch(`http://localhost:8080/plant/${plantId}`);
      const data = await response.json();

      if (!ignore) {
        setPlant(data);
      }
    }
    fetchPlant();
    return () => {
      ignore = true;
    };
  }, [plantId]);

  if (!plant) {
    return <div>("Please wait while your plant grows...")</div>;
  }

  return (
    <div className="plant-container">
      <img
        className="plant-image"
        src={`http://localhost:8080/${plant.plantImagePath}`}
        alt={`Picture of ${plant.commonName}`}
      />
      <div className="plant-info">
        <h2>{plant.commonName}</h2>
        <h3>{plant.scientificName}</h3>
        <ol className="plant-info-list">
          <li>{plant.plantCycle}</li>
          {plant.isEdible && <li>Edible</li>}
          {plant.toxicToAnimals && <li>Toxic to Animals</li>}
          {plant.attractsBirds && <li>Attract Birds</li>}
          {plant.attractsButterflies && <li>Attract Butterflies</li>}
          {plant.attractsPollinators && <li>Attract Pollinators</li>}
          {plant.resistsDeer && <li>Deer Resistant</li>}
          <li>Season of Interest: {plant.seasonOfInterest}</li>
          <li>Color of Interest: {plant.colorOfInterest}</li>
          <li>Light: {plant.plantLight}</li>
          <li>Water: {plant.plantWater}</li>
          <li>Soil: {plant.plantSoil}</li>
        </ol>
        <div>
          <button className="plantCard-button">ADD TO GARDEN</button>
        </div>
      </div>
      <div className="plant-description">
        <div className="your-star-rating">
          <h3>What do you think of this plant?</h3>
          <StarRating />
        </div>
        <h2 className="description-header">Description</h2>
        <ol className="description-info-list">
          <li>Height: {plant.plantHeight}</li>
          <li>Spread: {plant.plantSpread}</li>
        </ol>
        <p>{plant.plantDescription}</p>
      </div>
    </div>
  );
}
export default PlantDetails;
