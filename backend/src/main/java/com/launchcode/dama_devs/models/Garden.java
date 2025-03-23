package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
public class Garden extends AbstractEntity {

    //Setters included so user can edit the garden values in the future via the dashboard.
    @Setter
    @NotNull
    private String gardenName;

    @Setter
    @NotNull
    private String gardenZone;

    @Setter
    @NotNull
    private String gardenLight;

    @Setter
    @NotNull
    private String gardenWater;

    @Setter
    @NotNull
    private String gardenSoil;

    //garden-plant relationship
    @ManyToMany
    private final List<Plant> plants = new ArrayList<>();

    //garden-user relationship
    @Setter
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //constructors
    public Garden(User user, String gardenName, String gardenZone, String gardenLight, String gardenWater, String gardenSoil) {
        this.user = user;
        this.gardenName = gardenName;
        this.gardenZone = gardenZone;
        this.gardenLight = gardenLight;
        this.gardenWater = gardenWater;
        this.gardenSoil = gardenSoil;
    }

    @Override
    public String toString() {
        return "Garden{" +
                "gardenName='" + gardenName + '\'' +
                ", gardenZone='" + gardenZone + '\'' +
                ", gardenLight='" + gardenLight + '\'' +
                ", gardenWater='" + gardenWater + '\'' +
                ", gardenSoil='" + gardenSoil + '\'' +
                ", plants=" + plants +
                ", user=" + user +
                '}';
    }

    // Allows a plant to be added to plants list.
    public void addPlant(Plant plant){
        this.plants.add(plant);
    }

}
