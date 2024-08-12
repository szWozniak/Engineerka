package com.example.backend.simulatorIntegration.architecture;

import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import org.springframework.stereotype.Component;


@Component
public class Mediator implements IMediator {

    private final ICommandHandler<SaveRecordsCommand> SaveRecordsCommandHandler;

    public Mediator(ICommandHandler<SaveRecordsCommand> SaveRecordsCommandHandler) {
        this.SaveRecordsCommandHandler = SaveRecordsCommandHandler;
    }

    @Override
    public void send(ICommand command) {
        if (command instanceof SaveRecordsCommand){
            SaveRecordsCommandHandler.handle((SaveRecordsCommand) command);
        }
    }
}
