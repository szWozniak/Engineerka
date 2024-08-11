package com.example.backend.simulatorIntegration.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.simulatorIntegration.architecture.ICommandHandler;
import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.domain.flightRecord.FlightRecordService;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.envelope.RegistrationFlag;
import com.example.backend.listener.model.DroneFromSimulator;
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
    private final FlightService flightService;

    public SaveRecordsCommandHandler(FlightRecordService flightRecordService, DroneService droneService, FlightService flightService) {
        this.droneService = droneService;
        this.flightRecordService = flightRecordService;
        this.flightService = flightService;
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

        var validRecords = mapDronesFromSimulator(drones);

        this.droneService.UpsertDronesRecords(validRecords);

        handleDronesThatFinishedFlight(validRecords);
;    }

    private void handleDronesThatFinishedFlight(List<DroneRecordToRegister> drones){
        var dronesThatFlightEnded = drones
                .stream()
                .filter(record -> record.getFlightRecord().getFlag().equals(RegistrationFlag.DROP))
                .toList();

        if (dronesThatFlightEnded.size() > 0){
            flightService.CreateFlights(dronesThatFlightEnded);
        }
    }

    private List<DroneRecordToRegister> mapDronesFromSimulator(List<DroneFromSimulator> drones){
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
