package com.example.backend.scheduler;

import com.example.backend.drone.model.DroneToRegister;
import com.example.backend.event.IMediator;
import com.example.backend.event.command.SaveDronesCommand;
import com.example.backend.scheduler.configuration.SharedFolderConfig;
import com.example.backend.scheduler.model.DroneReadmodel;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.SyntaxException;
import org.springframework.stereotype.Component;

import javax.print.attribute.URISyntax;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class DroneRecordsReader {
    private final SharedFolderConfig config;
    private final IMediator mediator;

    public DroneRecordsReader(SharedFolderConfig config, IMediator mediator){
        this.config = config;
        this.mediator = mediator;
    }

    public void work(){
        var dronesFromCsv = readCsvRecord();
        var parsedDrones = parseDrones(dronesFromCsv);
        mediator.send(new SaveDronesCommand(parsedDrones));
    }

    private List<DroneReadmodel> readCsvRecord(){
        List<DroneReadmodel> drones = new ArrayList<>();

        var path = getClass().getClassLoader().getResource(config.getPath()).getPath();
        System.out.println(path);

        try (Reader reader = new FileReader(path)){
            CsvToBean<DroneReadmodel> csvToBean = new CsvToBeanBuilder<DroneReadmodel>(reader)
                    .withType(DroneReadmodel.class)
                    .withSeparator(',')
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            drones = csvToBean.parse();

            log.info("Correctly read previous drones records");
        }catch(IOException ex){
            log.error("Could not connect to shared folder. Reason: " + ex);
        }

        return drones;
    }

    private List<DroneToRegister> parseDrones(List<DroneReadmodel> dronesToParse){
        List<DroneToRegister> drones = new ArrayList<>();

        for (DroneReadmodel drone : dronesToParse){
            try{
                var parsedDrone = new DroneToRegister(drone);
                drones.add(parsedDrone);
            }catch (IllegalArgumentException ex){
                log.error("Could not parse drone record from CSV. Reason: " + ex);
            }
        }

        return drones;
    }
}
