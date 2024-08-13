package com.example.backend.simulatorIntegration;

import com.example.backend.events.architecture.IMediator;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.simulatorIntegration.configuration.SharedFolderConfig;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
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

    public void processFile(String filename){
        var dronesFromCsv = readCSV(filename);
        mediator.send(new SaveRecordsCommand(dronesFromCsv));
        removeCSV(filename);
    }

    private String getFilePath(String filename){
        StringBuilder filePath = new StringBuilder();

        filePath.append(new File(System.getProperty("user.dir")).getParent());
        filePath.append(config.getPath());
        filePath.append(filename);

        return filePath.toString();
    }

    private List<DroneFromSimulator> readCSV(String filename){
        List<DroneFromSimulator> drones = new ArrayList<>();

        var path = getFilePath(filename);

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

    private void removeCSV(String filename){
        var path = getFilePath(filename);
        File file = new File(path);

        if (file.delete())
            log.info("Deleted file: " + path);
        else
            log.info("Failed to delete file: " + path);
    }
}
