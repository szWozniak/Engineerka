package com.example.backend.events.mediator;

import com.example.backend.events.recordRegistration.handlers.SaveRecordsCommandHandler;
import com.example.backend.simulatorIntegration.model.DroneFromSimulatorFixtureBuilder;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

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
