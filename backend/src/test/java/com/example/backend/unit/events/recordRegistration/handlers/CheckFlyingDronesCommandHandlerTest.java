package com.example.backend.unit.events.recordRegistration.handlers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.events.recordRegistration.commands.CheckFlyingDronesCommand;
import com.example.backend.events.recordRegistration.handlers.CheckFlyingDronesCommandHandler;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import com.example.backend.unit.domain.drone.DroneEntityFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

public class CheckFlyingDronesCommandHandlerTest {
    private CheckFlyingDronesCommandHandler sut;
    private DroneService droneService;
    private FlightService flightService;


    @BeforeEach
    public void setUp(){
        droneService = Mockito.mock(DroneService.class);
        flightService = Mockito.mock(FlightService.class);
        sut = new CheckFlyingDronesCommandHandler(droneService, flightService);
    }

    @Test
    public void ShouldStopDrones_AndCreateFlights_ForNotReceivedDroneThatIsCurrentlyFlying(){
        var drones = new ArrayList<DroneFromSimulator>();
        var command = new CheckFlyingDronesCommand(drones);
        var drone = List.of(DroneEntityFixture.getFlyingDrone(new ArrayList<>(),"AAS421"));

        Mockito.when(droneService.getDronesThatShouldStopFlying(Mockito.any())).thenReturn(drone);

        sut.handle(command);

        Mockito.verify(droneService).stopDronesThatShouldStopFlying(drone);
        Mockito.verify(flightService).createFlights(drone.stream().map(DroneEntity::getRegistrationNumber).toList());
    }
}
