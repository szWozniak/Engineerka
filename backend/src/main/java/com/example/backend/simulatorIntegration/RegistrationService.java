package com.example.backend.simulatorIntegration;

import com.example.backend.simulatorIntegration.DroneRecordsReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RegistrationService {
    private final DroneRecordsReader reader;

    public RegistrationService(DroneRecordsReader reader){
        this.reader = reader;
    }

    @RabbitListener(queues = {"fileQueue"})
    public void onFileCreation(String filename){
        log.info("Received file creation: " + filename);
        reader.processFile(filename);
    }

}
