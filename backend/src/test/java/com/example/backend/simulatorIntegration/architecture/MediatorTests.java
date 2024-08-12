package com.example.backend.simulatorIntegration.architecture;

import com.example.backend.DroneFromSimulatorFixture;
import com.example.backend.simulatorIntegration.events.recordRegistration.commands.SaveRecordsCommand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class MediatorTests {
    private Mediator sut;
    @Mock
    private ICommandHandler<SaveRecordsCommand> handler;

    @BeforeEach
    public void setUp(){
        sut = new Mediator(handler);
    }

    @Test
    public void ShouldCallSaveRecordsCommandHandler_WhenReceivesSaveRecordsCommand(){
        var dronesFromSimulator = List.of(DroneFromSimulatorFixture.DefaultDrone);
        SaveRecordsCommand command = new SaveRecordsCommand(dronesFromSimulator);

        sut.send(command);

        Mockito.verify(handler).handle(command);
    }
}
