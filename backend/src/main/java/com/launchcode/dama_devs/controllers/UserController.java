package com.launchcode.dama_devs.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {
    @GetMapping("/hello")
    @ResponseBody
    public String sayHello(){
        return"hello";
    }
    @GetMapping("/contact")
    @ResponseBody
    public String sayContact(){
        return"Contact";
    }
}
