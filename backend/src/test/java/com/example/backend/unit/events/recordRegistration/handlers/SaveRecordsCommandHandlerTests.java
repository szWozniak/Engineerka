package com.example.backend.unit.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.domain.flightRecord.FlightRecordService;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.events.recordRegistration.handlers.SaveRecordsCommandHandler;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import com.example.backend.unit.simulatorIntegration.model.DroneFromSimulatorFixtureBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

public class SaveRecordsCommandHandlerTests {
    private SaveRecordsCommandHandler sut;
    private DroneService droneService;
    private FlightService flightService;
    private FlightRecordService flightRecordService;


    @BeforeEach
    public void setUp(){
        droneService = Mockito.mock(DroneService.class);
        flightService = Mockito.mock(FlightService.class);
        flightRecordService = Mockito.mock(FlightRecordService.class);
        sut = new SaveRecordsCommandHandler(flightRecordService,
                droneService,
                flightService);

    }

    @Test
    public void ShouldProcessAllValidRecordsRecords(){
        Mockito.when(flightRecordService.isRecordRegister(Mockito.any())).thenReturn(false);

        var droneOne = new DroneFromSimulatorFixtureBuilder().WithFlag("DROP").build();
        var droneTwo = new DroneFromSimulatorFixtureBuilder().WithFlag("UPD").build();

        var command = new SaveRecordsCommand(List.of(droneOne, droneTwo));

        sut.handle(command);

        var expectedResultOne = DroneRecordToRegister.fromDroneFromSimulator(droneOne);
        var expectedResultTwo = DroneRecordToRegister.fromDroneFromSimulator(droneTwo);

        Mockito.verify(droneService).UpsertDronesRecords(List.of(expectedResultOne, expectedResultTwo));
        Mockito.verify(flightService).CreateFlights(List.of(expectedResultOne));
    }

    @Test
    public void ShouldNotProcessRecord_WhenGivenEmptyListInCommand(){
        Mockito.when(flightRecordService.isRecordRegister(Mockito.any())).thenReturn(false);

        List<DroneFromSimulator> emptyList = new ArrayList<>();

        var command = new SaveRecordsCommand(emptyList);

        sut.handle(command);

        Mockito.verify(droneService, Mockito.never()).UpsertDronesRecords(Mockito.any());
        Mockito.verify(flightService, Mockito.never()).CreateFlights(Mockito.any());
    }

    @Test
    public void ShouldNotProcessAlreadyRegisteredRecords(){
        Mockito.when(flightRecordService.isRecordRegister(Mockito.any())).thenReturn(false);

        var command = new SaveRecordsCommand(List.of(new DroneFromSimulatorFixtureBuilder().build()));

        sut.handle(command);

        Mockito.verify(droneService, Mockito.never()).UpsertDronesRecords(List.of());
        Mockito.verify(flightService, Mockito.never()).CreateFlights(List.of());
    }

    @Test
    public void ShouldNotProcessInvalidRecords(){
        Mockito.when(flightRecordService.isRecordRegister(Mockito.any())).thenReturn(false);

        var drone = new DroneFromSimulatorFixtureBuilder().WithLatitude("XDD").build();

        var command = new SaveRecordsCommand(List.of(drone));

        sut.handle(command);

        Mockito.verify(droneService).UpsertDronesRecords(List.of());
        Mockito.verify(flightService, Mockito.never()).CreateFlights(List.of());
    }
}
