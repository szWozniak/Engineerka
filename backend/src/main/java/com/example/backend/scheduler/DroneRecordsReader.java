package com.example.backend.scheduler;

import com.example.backend.drone.DroneEntity;
import com.example.backend.drone.model.DroneToRegister;
import com.example.backend.drone.model.envelope.RegistrationFlag;
import com.example.backend.event.IMediator;
import com.example.backend.event.command.SaveRecordsCommand;
import com.example.backend.scheduler.configuration.SharedFolderConfig;
import com.example.backend.scheduler.model.DroneReadmodel;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
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
        mediator.send(new SaveRecordsCommand(dronesFromCsv));
    }

    private List<DroneReadmodel> readCsvRecord(){
        List<DroneReadmodel> drones = new ArrayList<>();

        var path = getClass().getClassLoader().getResource(config.getPath()).getPath();

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
}
