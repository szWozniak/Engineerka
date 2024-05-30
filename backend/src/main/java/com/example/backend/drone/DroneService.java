package com.example.backend.drone;

import com.example.backend.drone.model.DroneToRegister;
import com.example.backend.drone.model.envelope.RegistrationFlag;
import com.example.backend.event.ICommandHandler;
import com.example.backend.event.command.SaveDronesCommand;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DroneService implements ICommandHandler<SaveDronesCommand> {
    private final DroneRepository droneRepository;

    public DroneService(DroneRepository droneRepository){
        this.droneRepository = droneRepository;
    }

    public void handle(SaveDronesCommand command){
        var dronesToRegister = command.drones();
        var currentDrones = droneRepository.findAll();
        System.out.println("Number of drones: " + currentDrones.size());

        for (DroneToRegister drone : dronesToRegister){
            updateOrAddDrone(drone, currentDrones);
        }

        droneRepository.saveAll(currentDrones);
    }

    private void updateOrAddDrone(DroneToRegister drone, List<DroneEntity> curDrones){
        var searchedDrone = curDrones.stream().filter(entity -> entity.getRegistrationNumber().equals(drone.getRegistrationNumber())).findFirst();

        if (searchedDrone.isEmpty()){
            curDrones.add(new DroneEntity(drone.getRegistrationNumber(), RegistrationFlag.MapToAirbourne(drone.getFlag()),
                    drone.getCountry(), drone.getOperator(), drone.getIdentification().getValue(), drone.getModel(), drone.getSign(), drone.getType(), drone.getFuel()));
            return;
        }

        var foundDrone = searchedDrone.get();
        foundDrone.setAirbourne(RegistrationFlag.MapToAirbourne(drone.getFlag()));
    }
}
