package com.example.backend.event.handlers;

import com.example.backend.drone.DroneEntity;
import com.example.backend.drone.DroneService;
import com.example.backend.event.model.droneToRegister.DroneToRegister;
import com.example.backend.event.model.droneToRegister.envelope.RegistrationFlag;
import com.example.backend.event.ICommandHandler;
import com.example.backend.event.command.SaveRecordsCommand;
import com.example.backend.position.PositionEntity;
import com.example.backend.position.PositionService;
import com.example.backend.scheduler.model.DroneReadmodel;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class SaveRecordsCommandHandler implements ICommandHandler<SaveRecordsCommand> {
    private final PositionService positionService;
    private final DroneService droneService;

    public SaveRecordsCommandHandler(PositionService positionService, DroneService droneService) {
        this.droneService = droneService;
        this.positionService = positionService;
    }

    @Transactional
    public void handle(SaveRecordsCommand command){
        var drones = command.drones();

        if (drones.size() == 0){
            log.info("File contained no records");
            return;
        }

        if (positionService.isRecordRegister(drones.get(0).getFilename())){
            log.info("File already registered");
            return;
        }

        var validRecords = mapReadmodels(drones);
        var entities = mapToEntities(validRecords);
        this.positionService.updatePositions(entities.stream().map(record -> record.position).toList());
        this.droneService.updateDrones(entities.stream().map(record -> record.drone).toList());
;    }

    private List<DroneToRegister> mapReadmodels(List<DroneReadmodel> drones){
        List<DroneToRegister> validRecords = new ArrayList<>();

        for(DroneReadmodel drone : drones){
            try{
                validRecords.add(new DroneToRegister(drone));
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

        var positionEntity = new PositionEntity(drone.getPosition());
        droneEntity.getPositions().add(positionEntity);
        droneEntity.setAirbourne(RegistrationFlag.MapToAirbourne(drone.getPosition().getFlag()));

        return new DroneWithPositionEntity(droneEntity, positionEntity);
    }

    private record DroneWithPositionEntity(DroneEntity drone, PositionEntity position){}
}
