package com.example.backend.integration.drone;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.domain.flightRecord.FlightRecordService;
import com.example.backend.events.mediator.ICommandHandler;
import com.example.backend.events.mediator.Mediator;
import com.example.backend.events.recordRegistration.commands.CheckFlyingDronesCommand;
import com.example.backend.events.recordRegistration.commands.SaveRecordsCommand;
import com.example.backend.events.recordRegistration.handlers.CheckFlyingDronesCommandHandler;
import com.example.backend.events.recordRegistration.handlers.SaveRecordsCommandHandler;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import com.example.backend.unit.domain.drone.DroneEntityFixture;
import com.example.backend.unit.domain.flightRecord.FlightRecordEntityFixtureBuilder;
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
        Assertions.assertTrue(droneResult.get(0).isAirborne());
        Assertions.assertEquals("Airborne", droneResult.get(0).getType());

        var droneFlight = droneService.getDroneFinishedFlights(droneResult.get(0).getRegistrationNumber());
        Assertions.assertEquals(0, droneFlight.size());
    }

    @Test
    public void ShouldStopDrone_AndFinishFlight_WhenSimulatorReturnedNoRecords() {
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

    @Test
    public void ShouldStopDrone_AndFinishFlight_WhenSimulatorReturnedRecords() {
        setupDatabase();
        var drones = List.of(
                new DroneFromSimulator(
                        "filename2",
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
                        "znak",
                        "Airborne",
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

        Assertions.assertEquals(2, droneResult.size());
        Assertions.assertEquals("flyingDroneWithRecords", droneResult.get(0).getRegistrationNumber());
        Assertions.assertFalse(droneResult.get(0).isAirborne());
        Assertions.assertEquals("Grounded", droneResult.get(0).getType());
        Assertions.assertEquals("420-69-2137", droneResult.get(1).getRegistrationNumber());
        Assertions.assertTrue(droneResult.get(1).isAirborne());
        Assertions.assertEquals("Airborne", droneResult.get(1).getType());

        var droneFlight = droneService.getDroneFinishedFlights(droneResult.get(0).getRegistrationNumber());
        Assertions.assertEquals(1, droneFlight.size());
    }

    @Test
    public void ShouldAddFlightRecord_WhenSimulatorReturnedRecords() {
        setupDatabase();
        var drones = List.of(
                new DroneFromSimulator(
                        "filename2",
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
                        "Hawana",
                        "Michael Jackson",
                        3,
                        "pink",
                        "szybcior",
                        "flyingDroneWithRecords",
                        "znak",
                        "Airborne",
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
        Assertions.assertEquals("flyingDroneWithRecords", droneResult.get(0).getRegistrationNumber());
        Assertions.assertTrue(droneResult.get(0).isAirborne());
        Assertions.assertEquals("Airborne", droneResult.get(0).getType());
        Assertions.assertEquals(2, droneResult.get(0).getFlightRecords().size());

        var droneFlight = droneService.getDroneFinishedFlights(droneResult.get(0).getRegistrationNumber());
        Assertions.assertEquals(0, droneFlight.size());
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

        var flightRecords = new ArrayList<FlightRecordEntity>();
        flightRecords.add(flightRecord);

        var drone = isFlying ?
                DroneEntityFixture.getFlyingDrone(flightRecords, droneRegNumber) :
                DroneEntityFixture.getNotFlyingDrone(flightRecords, droneRegNumber);
        fakeDb.persistAndFlush(drone);

        flightRecord.setDrone(drone);
        fakeDb.persistAndFlush(flightRecord);
    }
}
