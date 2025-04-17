package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PlantFilteringService {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private PlantRepository plantRepository;

    public List<Plant> filterPlantsByGardenFields(Integer gardenId) {
        Optional<Garden> gardenResult = gardenRepository.findById(gardenId);
        if (!gardenResult.isPresent()) {
            throw new RuntimeException("Garden ID not found" + gardenId);
        }
        Garden garden = gardenResult.get();

        Iterable<Plant> allPlants = plantRepository.findAll();

        List<Plant> matchingGardenPlants = new ArrayList<>();

        for (Plant plant : allPlants) {
            if (plant.getPlantZone().contains(garden.getGardenZone()) &&
                    plant.getPlantLight().contains(garden.getGardenLight()) &&
                    plant.getPlantWater().contains(garden.getGardenWater()) &&
                    plant.getPlantSoil().contains(garden.getGardenSoil())) {
                System.out.println("Plant zone: " + plant.getPlantZone() + " | Garden zone: " + garden.getGardenZone());
                System.out.println("Plant light: " + plant.getPlantLight() + " | Garden zone: " + garden.getGardenLight());
                System.out.println("Plant zone: " + plant.getPlantWater() + " | Garden zone: " + garden.getGardenWater());
                System.out.println("Plant zone: " + plant.getPlantSoil() + " | Garden zone: " + garden.getGardenSoil());
                matchingGardenPlants.add(plant);
            }
        }
        System.out.println(matchingGardenPlants);
        return matchingGardenPlants;
    }
}
