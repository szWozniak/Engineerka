package com.example.backend.event;

import com.example.backend.event.command.SaveDronesCommand;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final ICommandHandler<SaveDronesCommand> droneService;

    public Mediator(ICommandHandler<SaveDronesCommand> droneService) {
        this.droneService = droneService;
    }

    @Override
    public <T extends ICommand>void send(T command) {
        if (command instanceof SaveDronesCommand){
            droneService.handle((SaveDronesCommand) command);
        }
    }
}
