package com.example.backend.event;

import com.example.backend.event.command.SaveRecordsCommand;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final ICommandHandler<SaveRecordsCommand> droneService;

    public Mediator(ICommandHandler<SaveRecordsCommand> droneService) {
        this.droneService = droneService;
    }

    @Override
    public <T extends ICommand>void send(T command) {
        if (command instanceof SaveRecordsCommand){
            droneService.handle((SaveRecordsCommand) command);
        }
    }
}
