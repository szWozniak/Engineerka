package com.example.backend.unit.events.mediator;

import com.example.backend.events.mediator.ICommandHandler;
import com.example.backend.events.mediator.Mediator;
import com.example.backend.events.recordRegistration.handlers.SaveRecordsCommandHandler;
import com.example.backend.unit.simulatorIntegration.model.DroneFromSimulatorFixtureBuilder;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

public class MediatorTests {
    private Mediator sut;
    private ICommandHandler<SaveRecordsCommand> handler;

    @BeforeEach
    public void setUp(){
        handler = Mockito.mock(SaveRecordsCommandHandler.class);
        sut = new Mediator(handler);
    }

    @Test
    public void ShouldCallSaveRecordsCommandHandler_WhenReceivesSaveRecordsCommand(){
        var drone = new DroneFromSimulatorFixtureBuilder().build();
        var dronesFromSimulator = List.of(drone);
        SaveRecordsCommand command = new SaveRecordsCommand(dronesFromSimulator);

        sut.send(command);

        Mockito.verify(handler).handle(command);
    }
}
