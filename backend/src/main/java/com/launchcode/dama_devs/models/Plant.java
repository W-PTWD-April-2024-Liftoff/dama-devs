package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Plant extends AbstractEntity {

    //plant-garden relationship
    @Getter
    @ManyToMany(mappedBy = "plants")
    private final List<Garden> gardens = new ArrayList<>();

    //plant-comment relationship
    @Getter
    @OneToMany(mappedBy = "plant")
    private final List<Comment> comments = new ArrayList<>();
}
