package com.launchcode.dama_devs.models.dto;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Plant;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GardenPlantDTO {

    @NotNull
    private Garden garden;

    @NotNull
    private Plant plant;

    public GardenPlantDTO() {
    }
}
