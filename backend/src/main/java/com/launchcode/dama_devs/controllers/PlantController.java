package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.data.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;
}
