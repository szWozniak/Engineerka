package com.example.backend.integration.drone;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.domain.flightRecord.FlightRecordService;
import com.example.backend.events.mediator.ICommandHandler;
import com.example.backend.events.mediator.Mediator;
import com.example.backend.events.recordRegistration.commands.CheckFlyingDronesCommand;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.events.recordRegistration.handlers.CheckFlyingDronesCommandHandler;
import com.example.backend.events.recordRegistration.handlers.SaveRecordsCommandHandler;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@DataJpaTest
public class SimulatorIntegrationTests {
    @Autowired
    private TestEntityManager fakeDb;
    @Autowired
    private DroneRepository droneRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private FlightRecordRepository flightRecordRepository;
    private DroneToRegisterMapper droneToRegisterMapper;
    private DroneService droneService;
    private FlightRecordService flightRecordService;
    private FlightService flightService;
    private Mediator sut;
    private ICommandHandler<SaveRecordsCommand> saveHandler;
    private ICommandHandler<CheckFlyingDronesCommand> checkHandler;

    @BeforeEach
    public void setUp(){
        droneToRegisterMapper = new DroneToRegisterMapper();
        droneService = new DroneService(droneRepository, flightRecordRepository, droneToRegisterMapper, flightRepository);
        flightRecordService = new FlightRecordService(flightRecordRepository);
        flightService = new FlightService(flightRepository, flightRecordRepository);
        saveHandler = new SaveRecordsCommandHandler(flightRecordService, droneService, flightService);
        checkHandler = new CheckFlyingDronesCommandHandler(droneService, flightService);
        sut = new Mediator(saveHandler, checkHandler);
    }

    @Test
    public void ShouldCreateDrone() {
        var drones = List.of(
                new DroneFromSimulator(
                        "filename",
                        "server",
                        LocalDate.now(),
                        LocalTime.now(),
                        "BEG",
                        "id",
                        "idExt",
                        "500423N",
                        "1195723E",
                        90,
                        100,
                        50,
                        "Nigeria",
                        "operator",
                        7,
                        "Magenta",
                        "Belmondo",
                        "420-69-2137",
                        "sign",
                        "type",
                        69,
                        "signal",
                        "frequency",
                        "sensorLat",
                        "sensorLon",
                        "sensorLabel"
                )
        );

        SaveRecordsCommand saveCommand = new SaveRecordsCommand(drones);
        CheckFlyingDronesCommand checkCommand = new CheckFlyingDronesCommand(drones);

        sut.send(saveCommand);
        sut.send(checkCommand);

        var droneResult = droneService.getDrones(new ArrayList<>());

        Assertions.assertEquals(1, droneResult.size());
        Assertions.assertEquals("420-69-2137", droneResult.get(0).getRegistrationNumber());
    }

    /*
    @Test
    public void ShouldStopDrone_AndFinishFlight() {
        setupDatabase();
        var drones = new ArrayList<DroneFromSimulator>();

        SaveRecordsCommand saveCommand = new SaveRecordsCommand(drones);
        CheckFlyingDronesCommand checkCommand = new CheckFlyingDronesCommand(drones);

        sut.send(saveCommand);
        sut.send(checkCommand);

        var droneResult = droneService.getDrones(new ArrayList<>());

        Assertions.assertEquals(1, droneResult.size());
        Assertions.assertEquals("flyingDroneWithRecords", droneResult.get(0).getRegistrationNumber());
        Assertions.assertFalse(droneResult.get(0).isAirborne());
        Assertions.assertEquals("Grounded", droneResult.get(0).getType());

        var droneFlight = droneService.getDroneFinishedFlights(droneResult.get(0).getRegistrationNumber());
        Assertions.assertEquals(1, droneFlight.size());
    }

    private void setupDatabase(){
        persistDroneWithFlightRecord("1", "flyingDroneWithRecords", true);
    }

    private void persistDroneWithFlightRecord(String flightRecordId, String droneRegNumber, boolean isFlying){
        var flightRecord = new FlightRecordEntityFixtureBuilder()
                .withId(flightRecordId)
                .withDateAndTime(LocalDate.now(), LocalTime.now())
                .build();
        fakeDb.persistAndFlush(flightRecord);

        var drone = isFlying ?
                DroneEntityFixture.getFlyingDrone(List.of(flightRecord), droneRegNumber) :
                DroneEntityFixture.getNotFlyingDrone(List.of(flightRecord), droneRegNumber);
        fakeDb.persistAndFlush(drone);

        flightRecord.setDrone(drone);
        fakeDb.persistAndFlush(flightRecord);
    }
    */
}
