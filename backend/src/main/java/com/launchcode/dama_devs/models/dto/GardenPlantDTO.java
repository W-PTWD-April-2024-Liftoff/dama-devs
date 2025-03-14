package com.launchcode.dama_devs.models.dto;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Plant;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class GardenPlantDTO {

    @Getter
    @Setter
    @NotNull
    private Garden garden;

    @Getter
    @Setter
    @NotNull
    private Plant plant;

    public GardenPlantDTO() {
    }

    ;

}
