package com.example.backend.domain.flight;
import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@DataJpaTest
public class FlightServiceTests {
    private FlightRepository flightRepository;
    private FlightRecordRepository flightRecordRepository;
    private FlightService sut;

    //this is for assertions purposes
    @Autowired
    private TestEntityManager fakeDb;
    @Autowired
    private FlightRepository flightRepositoryForAssertions;
    @Autowired
    private FlightRecordRepository flightRecordRepositoryForAssertions;

    @BeforeEach
    public void setUp(){
        flightRepository = Mockito.mock(FlightRepository.class);
        flightRecordRepository = Mockito.mock(FlightRecordRepository.class);
        setUpMockedRepositories();
        sut = new FlightService(flightRepository, flightRecordRepository);
    }

    @Test
    public void ShouldCreateNewFlight_AndAssignFlightRecordsToAFlight(){
        //prepare existing drone entity with flight records
        var registrationNumber = "megaDroniarz";
        var existingFlightRecord = new FlightRecordEntity(
                "1",
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "UPD",
                "systemId",
                69.69,
                69.69,
                69,
                123,
                69,
                69
        );

        var existingDroneEntity = new DroneEntity(
                registrationNumber,
                false,
                "Hawana",
                "Michael Jackson",
                3,
                "pink",
                "szybcior",
                "znak",
                "fasd"
        );

        fakeDb.persistAndFlush(existingFlightRecord);

        existingDroneEntity.setFlightRecords(List.of(existingFlightRecord));
        existingFlightRecord.setDrone(existingDroneEntity);

        fakeDb.persistAndFlush(existingDroneEntity);
        fakeDb.persistAndFlush(existingFlightRecord);

        //prepare droneRecordToRegister
        var droneToRegister = DroneRecordToRegister.fromDroneFromSimulator(new DroneFromSimulator(
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "DROP",
                "id",
                "idExt",
                "50042N",
                "119572E",
                90,
                100,
                50,
                "Nigeria",
                "operator",
                7,
                "Magenta",
                "Twoj_Stary",
                registrationNumber,
                "sign",
                "type",
                69,
                "signal",
                "frequency",
                "sensorLat",
                "sensorLon",
                "sensorLabel"
        ));

        //act
        sut.CreateFlights(List.of(droneToRegister));

        //assert
        var flightRecordFromDb = flightRecordRepository.findById("1");
        Assertions.assertTrue(flightRecordFromDb.isPresent());
        Assertions.assertNotNull(flightRecordFromDb.get().getFlight());

        var flightFromDb = flightRepository.findAll().get(0);
        Assertions.assertEquals(flightFromDb.getFlightRecords().get(0), existingFlightRecord);
    }

    private void setUpMockedRepositories(){
        Mockito.when(flightRepository.save(Mockito.any(FlightEntity.class)))
                .thenAnswer(invocation -> {
                    FlightEntity entity = invocation.getArgument(0);

                    fakeDb.persistAndFlush(entity);

                    return true;
                });

        Mockito.when(flightRepository.saveAll(Mockito.<List<FlightEntity>>any()))
                .thenAnswer(invocation -> {
                    List<FlightEntity> entities = invocation.getArgument(0);

                    fakeDb.persistAndFlush(entities);

                    return true;
                });

        Mockito.when(flightRecordRepository.saveAll(Mockito.<List<FlightRecordEntity>>any()))
                .thenAnswer(invocation -> {
                    List<FlightRecordEntity> entities = invocation.getArgument(0);

                    fakeDb.persistAndFlush(entities);

                    return true;
                });
    }
}
