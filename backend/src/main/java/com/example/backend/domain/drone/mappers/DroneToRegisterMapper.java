package com.example.backend.domain.drone.mappers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.envelope.RegistrationFlag;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DroneToRegisterMapper {

    public List<DroneEntityWithFlightRecordEntity> mapToEntities(List<DroneRecordToRegister> dronesToRegister, List<DroneEntity> alreadyRegisteredDrones){

        List<DroneEntityWithFlightRecordEntity> entites = new ArrayList<>();

        for(DroneRecordToRegister drone : dronesToRegister){
            entites.add(createOrUpdateDrone(drone, alreadyRegisteredDrones));
        }

        return entites;
    }

    private DroneEntityWithFlightRecordEntity createOrUpdateDrone(DroneRecordToRegister drone, List<DroneEntity> curDrones){
        var searchedDrone = curDrones
                .stream()
                .filter(entity -> entity.getRegistrationNumber().equals(drone.getRegistrationNumber()))
                .findFirst();

        DroneEntity droneEntity = searchedDrone.orElse(DroneEntity.fromDroneToRegister(drone));

        var flightRecordEntity = new FlightRecordEntity(drone.getFlightRecord());

        droneEntity.getFlightRecords().add(flightRecordEntity);
        droneEntity.setAirborne(RegistrationFlag.MapToAirbourne(drone.getFlightRecord().getFlag()));

        return new DroneEntityWithFlightRecordEntity(droneEntity, flightRecordEntity);
    }
}


