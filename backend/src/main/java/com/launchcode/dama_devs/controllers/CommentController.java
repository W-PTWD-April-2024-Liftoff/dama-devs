package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.data.CommentRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    //used for user-comment relationship
    @Autowired
    private UserRepository userRepository;

    //used for plant-comment relationship
    @Autowired
    private PlantRepository plantRepository;

}
