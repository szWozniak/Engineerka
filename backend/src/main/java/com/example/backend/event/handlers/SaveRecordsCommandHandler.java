package com.example.backend.event.handlers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.event.model.registration.DroneToRegister;
import com.example.backend.event.model.registration.envelope.RegistrationFlag;
import com.example.backend.event.ICommandHandler;
import com.example.backend.event.command.SaveRecordsCommand;
import com.example.backend.domain.position.FlighRecordEntity;
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
        var entities = mapToEntities(validRecords);
        this.flightRecordService.updatePositions(entities.stream().map(record -> record.position).toList());
        this.droneService.updateDrones(entities.stream().map(record -> record.drone).toList());
;    }

    private List<DroneToRegister> mapReadmodels(List<DroneFromSimulator> drones){
        List<DroneToRegister> validRecords = new ArrayList<>();

        for(DroneFromSimulator drone : drones){
            try{
                validRecords.add(DroneToRegister.fromDroneFromSimulator(drone));
            }catch(IllegalArgumentException ex){
                log.error("Could not register a record. Reason: " + ex);
            }
        }
        return validRecords;
    }

    private List<DroneWithPositionEntity> mapToEntities(List<DroneToRegister> dronesToRegister){
        var registrationNumbers = dronesToRegister.stream().map(DroneToRegister::getRegistrationNumber).toList();
        var curDrones = droneService.getAllByIds(registrationNumbers);

        List<DroneWithPositionEntity> entites = new ArrayList<>();
        for(DroneToRegister drone : dronesToRegister){
            entites.add(saveDroneInformation(drone, curDrones));
        }

        return entites;
    }

    private DroneWithPositionEntity saveDroneInformation(DroneToRegister drone, List<DroneEntity> curDrones){
        var searchedDrone = curDrones.stream().filter(entity -> entity.getRegistrationNumber().equals(drone.getRegistrationNumber())).findFirst();

        DroneEntity droneEntity = searchedDrone.orElse(new DroneEntity(drone));

        var positionEntity = new FlighRecordEntity(drone.getPosition());
        droneEntity.getPositions().add(positionEntity);
        droneEntity.setAirborne(RegistrationFlag.MapToAirbourne(drone.getPosition().getFlag()));

        return new DroneWithPositionEntity(droneEntity, positionEntity);
    }

    private record DroneWithPositionEntity(DroneEntity drone, FlighRecordEntity position){}
}
