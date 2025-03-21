package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter //works for entire class. Did not use setters bc plant data is immutable.
public class Plant {

    //declared fields
    @NotNull
    @Id
    private int id;

    @NotNull
    private String commonName;

    @NotNull
    private String scientificName;

    @NotNull
    private String plantZone;

    @NotNull
    private String plantCycle;

    @NotNull
    private String plantType;

    @NotNull
    private String plantLight;

    @NotNull
    private String plantWater;

    @NotNull
    private String plantSoil;

    @NotNull
    private String plantDescription;

    @NotNull
    private String plantHeight;

    @NotNull
    private String plantSpread;

    @NotNull
    private String colorOfInterest;

    @NotNull
    private String seasonOfInterest;

    @NotNull
    private Boolean attractsBirds;

    @NotNull
    private Boolean attractsButterflies;

    @NotNull
    private Boolean attractsPollinators;

    @NotNull
    private Boolean isEdible;

    @NotNull
    private Boolean resistsDeer;

    @NotNull
    private Boolean toxicToAnimals;

    //plant-garden relationship
    @ManyToMany(mappedBy = "plants")
    private final List<Garden> gardens = new ArrayList<>();

    //plant-comment relationship
    @OneToMany(mappedBy = "plant")
    private final List<Comment> comments = new ArrayList<>();

    //constructor
    public Plant(int id, String commonName, String scientificName, String plantZone, String plantCycle, String plantType, String plantLight, String plantWater, String plantSoil, String plantDescription, String plantHeight, String plantSpread, String colorOfInterest, String seasonOfInterest, Boolean attractsBirds, Boolean attractsButterflies, Boolean attractsPollinators, Boolean isEdible, Boolean resistsDeer, Boolean toxicToAnimals) {
        this.id = id;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.plantZone = plantZone;
        this.plantCycle = plantCycle;
        this.plantType = plantType;
        this.plantLight = plantLight;
        this.plantWater = plantWater;
        this.plantSoil = plantSoil;
        this.plantDescription = plantDescription;
        this.plantHeight = plantHeight;
        this.plantSpread = plantSpread;
        this.colorOfInterest = colorOfInterest;
        this.seasonOfInterest = seasonOfInterest;
        this.attractsBirds = attractsBirds;
        this.attractsButterflies = attractsButterflies;
        this.attractsPollinators = attractsPollinators;
        this.isEdible = isEdible;
        this.resistsDeer = resistsDeer;
        this.toxicToAnimals = toxicToAnimals;
    }

    //empty constructor
    public Plant() {
    }

    //toString
    @Override
    public String toString() {
        return "Plant{" +
                "id=" + id + '\'' +
                ", commonName='" + commonName + '\'' +
                ", scientificName='" + scientificName + '\'' +
                ", plantZone='" + plantZone + '\'' +
                ", plantCycle='" + plantCycle + '\'' +
                ", plantType='" + plantType + '\'' +
                ", plantLight='" + plantLight + '\'' +
                ", plantWater='" + plantWater + '\'' +
                ", plantSoil='" + plantSoil + '\'' +
                ", plantDescription='" + plantDescription + '\'' +
                ", plantHeight='" + plantHeight + '\'' +
                ", plantSpread='" + plantSpread + '\'' +
                ", colorOfInterest='" + colorOfInterest + '\'' +
                ", seasonOfInterest='" + seasonOfInterest + '\'' +
                ", attractsBirds=" + attractsBirds +
                ", attractsButterflies=" + attractsButterflies +
                ", attractsPollinators=" + attractsPollinators +
                ", isEdible=" + isEdible +
                ", resistsDeer=" + resistsDeer +
                ", toxicToAnimals=" + toxicToAnimals +
                ", gardens=" + gardens +
                ", comments=" + comments +
                '}';
    }
}
