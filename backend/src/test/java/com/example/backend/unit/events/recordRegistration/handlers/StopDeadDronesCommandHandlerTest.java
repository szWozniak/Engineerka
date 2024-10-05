package com.example.backend.unit.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.events.deadDronesStoppage.commands.StopDeadDronesCommand;
import com.example.backend.events.deadDronesStoppage.handlers.StopDeadDronesCommandHandler;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import com.example.backend.unit.domain.drone.DroneEntityFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StopDeadDronesCommandHandlerTest {
    private StopDeadDronesCommandHandler sut;
    private DroneService droneService;
    private FlightService flightService;


    @BeforeEach
    public void setUp(){
        droneService = Mockito.mock(DroneService.class);
        flightService = Mockito.mock(FlightService.class);
        sut = new StopDeadDronesCommandHandler(droneService, flightService);
    }

    @Test
    public void ShouldStopDrones_AndCreateFlights_ForNotReceivedDroneThatIsCurrentlyFlying(){
        var drones = new ArrayList<DroneFromSimulator>();
        var command = new StopDeadDronesCommand(drones);
        var drone = List.of(DroneEntityFixture.getFlyingDrone(new ArrayList<>(),"AAS421"));

        Mockito.when(droneService.findAndStopDronesThatShouldStopFlying(Mockito.any())).thenReturn(drone);

        sut.handle(command);

        Map<String, Boolean> droneRegistrationNumbersAndFlightStatus = new HashMap<>();

        drone.forEach(droneRecord -> droneRegistrationNumbersAndFlightStatus.put(droneRecord.getRegistrationNumber(), false));

        Mockito.verify(flightService).createFlights(drone.stream().map(DroneEntity::getRegistrationNumber).toList(), false);
    }
}
