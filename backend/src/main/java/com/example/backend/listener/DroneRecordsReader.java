package com.example.backend.listener;

import com.example.backend.simulatorIntegration.architecture.IMediator;
import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.listener.configuration.SharedFolderConfig;
import com.example.backend.listener.model.DroneFromSimulator;
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

    public void work(String filename){
        var dronesFromCsv = readCsvRecord(filename);
        mediator.send(new SaveRecordsCommand(dronesFromCsv));
        removeCSVRecord(filename);
    }

    private List<DroneFromSimulator> readCsvRecord(String filename){
        List<DroneFromSimulator> drones = new ArrayList<>();

        var path = new File(System.getProperty("user.dir")).getParent() + config.getPath() + filename;

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

    private void removeCSVRecord(String filename){
        var path = new File(System.getProperty("user.dir")).getParent() + config.getPath() + filename;
        File file = new File(path);

        boolean isDeleted = file.delete();

        if (isDeleted)
            log.info("Deleted file: " + path);
        else
            log.info("Failed to delete file: " + path);
    }
}
