package com.example.backend.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.events.mediator.ICommandHandler;
import com.example.backend.events.recordRegistration.commands.CheckFlyingDronesCommand;
import com.example.backend.events.recordRegistration.mappers.DronesFromSimulatorMapper;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class CheckFlyingDronesCommandHandler implements ICommandHandler<CheckFlyingDronesCommand> {
    private final DroneService droneService;
    private final FlightService flightService;

    public CheckFlyingDronesCommandHandler(DroneService droneService, FlightService flightService) {
        this.droneService = droneService;
        this.flightService = flightService;
    }

    @Transactional
    public void handle(CheckFlyingDronesCommand command) {
        var drones = command.drones();

        var validRecords = DronesFromSimulatorMapper.map(drones);
        List<String> flyingDronesRegistrationNumbers = validRecords.stream().map(DroneRecordToRegister::getRegistrationNumber).toList();

        List<DroneEntity> dronesThatShouldStopFlying = droneService.getDronesThatShouldStopFlying(flyingDronesRegistrationNumbers);
        droneService.stopDronesThatShouldStopFlying(dronesThatShouldStopFlying);

        flightService.createFlights(dronesThatShouldStopFlying.stream().map(DroneEntity::getRegistrationNumber).toList());
    }
}
