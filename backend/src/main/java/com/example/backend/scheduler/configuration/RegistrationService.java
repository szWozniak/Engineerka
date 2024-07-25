package com.example.backend.scheduler.configuration;

import com.example.backend.scheduler.DroneRecordsReader;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class RegistrationService {
    private final DroneRecordsReader reader;

    public RegistrationService(DroneRecordsReader reader){
        this.reader = reader;
    }

    @Scheduled(fixedRateString = "#{@sharedFolderConfig.getInterval()}")
    public void run() {reader.work();}

}
