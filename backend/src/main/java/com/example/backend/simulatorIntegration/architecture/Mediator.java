package com.example.backend.simulatorIntegration.architecture;

import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final ICommandHandler<SaveRecordsCommand> droneService;

    public Mediator(ICommandHandler<SaveRecordsCommand> droneService) {
        this.droneService = droneService;
    }

    @Override
    public void send(ICommand command) {
        if (command instanceof SaveRecordsCommand){
            droneService.handle((SaveRecordsCommand) command);
        }
    }
}
