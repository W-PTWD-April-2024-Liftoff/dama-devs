package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello, You gave permission to admin to access this page with Authentication";
    }

    @GetMapping("/contact")
    public String sayContact(){
        return "Here, You gave permission to everyone without Authentication";
    }

    @GetMapping("/auth")
    public String testAuth(){
        return "Here, You implemented Authentication to everybody to access this page!";
    }

}
