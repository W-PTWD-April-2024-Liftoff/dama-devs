package com.launchcode.dama_devs.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;


@MappedSuperclass
public class AbstractEntity {
    @Id
    @GeneratedValue
    private int id;



    //getters and setters

    public int getId() {
        return id;

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractEntity that = (AbstractEntity) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {

        return Objects.hashCode(id);

    }
}