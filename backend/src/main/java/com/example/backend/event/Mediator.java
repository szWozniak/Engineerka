package com.example.backend.event;

import com.example.backend.drone.DroneService;
import com.example.backend.event.command.SaveDronesCommand;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final DroneService droneService;

    public Mediator(DroneService droneService) {
        this.droneService = droneService;
    }

    @Override
    public void send(ICommand command) {
        if (command instanceof SaveDronesCommand){
            droneService.handle((SaveDronesCommand) command);
        }
    }
}
