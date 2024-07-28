package com.example.backend.scheduler;

import com.example.backend.simulatorIntegration.architecture.IMediator;
import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.scheduler.configuration.SharedFolderConfig;
import com.example.backend.scheduler.model.DroneFromSimulator;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
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

    private List<DroneFromSimulator> readCsvRecord(){
        List<DroneFromSimulator> drones = new ArrayList<>();

        var path = new File(System.getProperty("user.dir")).getParent() + config.getPath();

        try (Reader reader = new FileReader(path)){
            CsvToBean<DroneFromSimulator> csvToBean = new CsvToBeanBuilder<DroneFromSimulator>(reader)
                    .withType(DroneFromSimulator.class)
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
