package com.example.backend.events.mediator;

import com.example.backend.events.recordRegistration.commands.CheckFlyingDronesCommand;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.events.recordRegistration.handlers.CheckFlyingDronesCommandHandler;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final ICommandHandler<SaveRecordsCommand> SaveRecordsCommandHandler;
    private final ICommandHandler<CheckFlyingDronesCommand> CheckFlyingDronesCommandHandler;

    public Mediator(ICommandHandler<SaveRecordsCommand> SaveRecordsCommandHandler, ICommandHandler<CheckFlyingDronesCommand> CheckFlyingDronesCommandHandler) {
        this.SaveRecordsCommandHandler = SaveRecordsCommandHandler;
        this.CheckFlyingDronesCommandHandler = CheckFlyingDronesCommandHandler;
    }

    @Override
    public void send(ICommand command) {
        if (command instanceof SaveRecordsCommand){
            SaveRecordsCommandHandler.handle((SaveRecordsCommand) command);
        } else if (command instanceof CheckFlyingDronesCommand) {
            CheckFlyingDronesCommandHandler.handle((CheckFlyingDronesCommand) command);
        }
    }
}
