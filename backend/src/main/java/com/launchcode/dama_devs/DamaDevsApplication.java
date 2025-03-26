package com.launchcode.dama_devs;

import com.launchcode.dama_devs.services.CsvToDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;


@SpringBootApplication
public class DamaDevsApplication implements CommandLineRunner {

    @Autowired
    private CsvToDatabase csvToDatabase;

    public static void main(String[] args) {
        SpringApplication.run(DamaDevsApplication.class, args);

    }
    @Override
    public void run(String...args) {
        try {
            csvToDatabase.insertRecords("src/main/resources/plant_data.csv");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
