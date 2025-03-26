package com.launchcode.dama_devs.models.dto;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Plant;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@NotNull
@Getter @Setter
public class GardenPlantDTO {
    private Garden garden;
    private Plant plant;
    private Boolean plantInGarden = false;
}
