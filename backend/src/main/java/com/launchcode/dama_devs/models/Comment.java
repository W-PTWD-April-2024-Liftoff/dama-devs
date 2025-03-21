package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Comment extends AbstractEntity {

    //comments - users relationship
    @NotNull (message = "A user is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //comments - plants relationship
    @NotNull (message = "A plant is required")
    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;

    //constructor
    public Comment(User user, Plant plant) {
        this.user = user;
        this.plant = plant;
    }
}
