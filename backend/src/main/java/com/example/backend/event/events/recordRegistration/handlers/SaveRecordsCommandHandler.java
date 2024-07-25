package com.example.backend.event.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneService;
import com.example.backend.event.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.event.architecture.ICommandHandler;
import com.example.backend.event.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.domain.position.FlightRecordService;
import com.example.backend.scheduler.model.DroneFromSimulator;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class SaveRecordsCommandHandler implements ICommandHandler<SaveRecordsCommand> {
    private final FlightRecordService flightRecordService;
    private final DroneService droneService;

    public SaveRecordsCommandHandler(FlightRecordService flightRecordService, DroneService droneService) {
        this.droneService = droneService;
        this.flightRecordService = flightRecordService;
    }

    @Transactional
    public void handle(SaveRecordsCommand command){
        var drones = command.drones();

        if (drones.size() == 0){
            log.info("File contained no records");
            return;
        }

        if (flightRecordService.isRecordRegister(drones.get(0).getFilename())){
            log.info("File already registered");
            return;
        }

        var validRecords = mapReadmodels(drones);
        this.droneService.UpsertDronesRecords(validRecords);
;    }

    private List<DroneRecordToRegister> mapReadmodels(List<DroneFromSimulator> drones){
        List<DroneRecordToRegister> validRecords = new ArrayList<>();

        for(DroneFromSimulator drone : drones){
            try{
                validRecords.add(DroneRecordToRegister.fromDroneFromSimulator(drone));
            }catch(IllegalArgumentException ex){
                log.error("Could not register a record. Reason: " + ex);
            }
        }
        return validRecords;
    }
}
