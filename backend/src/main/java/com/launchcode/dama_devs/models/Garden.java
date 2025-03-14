package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Garden extends AbstractEntity {

    //garden-plant relationship
    @Getter
    @ManyToMany
    private final List<Plant> plants = new ArrayList<>();

    //garden-user relationship
    @Setter
    @Getter
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //constructor
    public Garden(User user) {
        this.user = user;
    }

    //this is usually housed with the getters and setters.
    // Allows a plant to be added to plants list.
    public void addPlant(Plant plant){
        this.plants.add(plant);
    }

}
