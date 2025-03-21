package com.launchcode.dama_devs.controllers;


import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class ExampleTwoController {

    @GetMapping("/hershey-kisses")
    public String exampleOne() {
        return "Yippee! Check out the React endpoints, too!  They can be different and even more delicious!?";
    }
}

// these examples are written for each member to use as a routing/mapping resource when writing their controller codes to be accessed from React
// they can be deleted when the project is complete

