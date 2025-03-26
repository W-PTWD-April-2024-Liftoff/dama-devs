package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.dto.GardenPlantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddPlantService {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private PlantRepository plantRepository;

    //Add a plant to a garden, create a DTO to send back with flag that plant was added.
    public GardenPlantDTO addPlantToGarden(Integer gardenId, Integer plantId) {
        Optional<Garden> gardenResult = gardenRepository.findById(gardenId);
        if (!gardenResult.isPresent()) {
            throw new IllegalArgumentException("Garden not found with id " + gardenId);
        }
        Garden garden = gardenResult.get();

        Optional<Plant> plantResult = plantRepository.findById(plantId);
        if (!plantResult.isPresent()) {
            throw new IllegalArgumentException("Plant not found with id " + plantId);
        }
        Plant plant = plantResult.get();

        if (!garden.getPlants().contains(plant)) {
            garden.addPlant(plant);
            gardenRepository.save(garden);
        }
        GardenPlantDTO gardenPlantDTO = new GardenPlantDTO();
        gardenPlantDTO.setGarden(garden);
        gardenPlantDTO.setPlantInGarden(true);

        return gardenPlantDTO;
    }
}