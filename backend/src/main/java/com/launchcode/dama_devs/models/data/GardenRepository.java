package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.Garden;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GardenRepository extends CrudRepository<Garden, Integer> {
}
