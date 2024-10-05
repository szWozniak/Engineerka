package com.example.backend.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.events.recordRegistration.mappers.DronesFromSimulatorMapper;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.events.mediator.ICommandHandler;
import com.example.backend.domain.flightRecord.FlightRecordService;
import com.example.backend.events.recordRegistration.model.envelope.RegistrationFlag;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

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

        if (drones.isEmpty()){
            log.info("File contained no records");
            return;
        }

        if (flightRecordService.isRecordRegister(drones.get(0).getFilename())){
            log.info("File already registered");
            return;
        }

        var validRecords = DronesFromSimulatorMapper.map(drones);

        this.droneService.upsertDronesRecords(validRecords);

        handleDronesThatFinishedFlight(validRecords);
;    }

    private void handleDronesThatFinishedFlight(List<DroneRecordToRegister> drones){
        var dronesThatFlightEnded = drones
                .stream()
                .filter(record -> record.getFlightRecord().getFlag().equals(RegistrationFlag.DROP))
                .toList();

        if (!dronesThatFlightEnded.isEmpty()){
            flightService.createFlights(dronesThatFlightEnded.stream().map(DroneRecordToRegister::getRegistrationNumber).toList());
        }
    }
}
