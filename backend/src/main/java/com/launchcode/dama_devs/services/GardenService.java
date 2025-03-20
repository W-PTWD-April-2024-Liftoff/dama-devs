package com.launchcode.dama_devs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

public class GardenService {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    public GardenService (GardenRepository gardenRepository) {
        this.gardenRepository = gardenRepository;
    }

    //Get all user's gardens in dashboard
    public List<Garden> getAllGardens() {
        return gardenRepository.findAll();
    }

    //Get a specific user garden
    public Optional<Garden> getGardenById(ID id) {
        return gardenRepository.findById(id)
    }

    //Update a user garden
    public Garden saveGarden(Garden garden) {
        return gardenRepository.save(garden);
    }

    //Delete a user garden
    public void deleteGarden(ID id) {
        gardenRepository.deleteById(id);
    }
}