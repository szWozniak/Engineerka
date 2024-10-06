package com.example.backend.integration.drone;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.IDroneFilter;
import com.example.backend.domain.drone.filtering.filters.NumberFilter;
import com.example.backend.domain.drone.filtering.filters.TextFilter;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.unit.domain.drone.DroneEntityFixtureBuilder;
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
public class CurrentlyFlyingDronesIntegrationTests {
    private DroneService droneService;

    @Autowired
    private TestEntityManager fakeDb;
    @Autowired
    private DroneRepository droneRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private FlightRecordRepository flightRecordRepository;

    @BeforeEach
    public void setUp(){
        droneService = new DroneService(droneRepository, flightRecordRepository, flightRepository);
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_WithRegisteredPositions_WhenNoFiltersApplied(){
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").build())
        );
        var result = droneService.getCurrentlyFlyingDrones(new ArrayList<>());

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
        Assertions.assertEquals("flyingDroneNotToBeFound", result.get(1).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_ThatPassTheNumberFilter_BasedOnTheFlightRecordsTime(){
        //prepare records in db
        var date = LocalDate.now();
        setupDatabase(
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("1").withDateAndTime(
                                date,
                                LocalTime.of(5, 5, 5, 5)
                        )
                                .withAltitude(30)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("2").withDateAndTime(
                                        date,
                                        LocalTime.of(4, 4, 4, 4)
                                )
                                .withAltitude(5)
                                .build()
                ),
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("3").withDateAndTime(
                                        date,
                                        LocalTime.of(5, 5, 5, 5)
                                )
                                .withAltitude(5)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("4").withDateAndTime(
                                        date,
                                        LocalTime.of(4, 4, 4, 4)
                                )
                                .withAltitude(30)
                                .build()
                ),
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("5").withDateAndTime(
                                        date,
                                        LocalTime.of(5, 5, 5, 5)
                                )
                                .withAltitude(30)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("6").withDateAndTime(
                                        date,
                                        LocalTime.of(4, 4, 4, 4)
                                )
                                .withAltitude(5)
                                .build()
                )
        );

        //prepare filter
        var filter = new NumberFilter("altitude", 10, ComparisonType.GreaterThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_ThatPassTheNumberFilter_BasedOnTheFlightRecordsDate(){
        //prepare records in db
        var time = LocalTime.now();
        setupDatabase(
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("1").withDateAndTime(
                                        LocalDate.of(2024, 10, 10),
                                        time
                                )
                                .withAltitude(30)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("2").withDateAndTime(
                                        LocalDate.of(2023, 5, 5),
                                        time
                                )
                                .withAltitude(5)
                                .build()
                ),
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("3").withDateAndTime(
                                        LocalDate.of(2024, 10, 10),
                                        time
                                )
                                .withAltitude(4)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("4").withDateAndTime(
                                        LocalDate.of(2023, 5, 5),
                                        time
                                )
                                .withAltitude(30)
                                .build()
                ),
                List.of(
                        new FlightRecordEntityFixtureBuilder().withId("5").withDateAndTime(
                                        LocalDate.of(2024, 10, 10),
                                        time
                                )
                                .withAltitude(30)
                                .build(),
                        new FlightRecordEntityFixtureBuilder().withId("6").withDateAndTime(
                                        LocalDate.of(2023, 5, 5),
                                        time
                                )
                                .withAltitude(5)
                                .build()
                )
        );

        var filter = new NumberFilter("altitude", 10, ComparisonType.GreaterThan);

        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheRegistrationNumberFilter(){
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").build())
        );

        var filter = new TextFilter("registrationNumber", "flyingDroneToBeFound", ComparisonType.Contains);
        List<IDroneFilter> filters = new ArrayList<>();
        filters.add(filter);
        var result = droneService.getCurrentlyFlyingDrones(filters);

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheAltitudeMinFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withAltitude(30).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withAltitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withAltitude(30).build())
        );

        var filter = new NumberFilter("altitude", 10, ComparisonType.GreaterThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheAltitudeMaxFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withAltitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withAltitude(50).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withAltitude(5).build())
        );

        var filter = new NumberFilter("altitude", 10, ComparisonType.LesserThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }
    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheLatitudeMinFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withLatitude(30).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withLatitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withLatitude(30).build())
        );

        var filter = new NumberFilter("latitude", 10, ComparisonType.GreaterThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheLatitudeMaxFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withLatitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withLatitude(50).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withLatitude(5).build())
        );

        var filter = new NumberFilter("latitude", 10, ComparisonType.LesserThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheLongitudeMinFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withLongitude(30).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withLongitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withLongitude(30).build())
        );

        var filter = new NumberFilter("longitude", 10, ComparisonType.GreaterThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheLongitudeMaxFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withLongitude(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withLongitude(50).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withLongitude(5).build())
        );

        var filter = new NumberFilter("longitude", 10, ComparisonType.LesserThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheFuelMinFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withFuel(30).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withFuel(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withFuel(30).build())
        );

        var filter = new NumberFilter("fuel", 10, ComparisonType.GreaterThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheFuelMaxFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").withFuel(5).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").withFuel(50).build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").withFuel(5).build())
        );

        var filter = new NumberFilter("fuel", 10, ComparisonType.LesserThan);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheModelFilter(){
        //prepare database
        setupDatabase(
                List.of(new FlightRecordEntityFixtureBuilder().withId("1").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("2").build()),
                List.of(new FlightRecordEntityFixtureBuilder().withId("3").build())
        );

        var filter = new TextFilter("model", "modelToBeFound", ComparisonType.Contains);

        //act
        var result = droneService.getCurrentlyFlyingDrones(List.of(filter));

        //assert
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneToBeFound", result.get(0).getRegistrationNumber());
    }


    private void setupDatabase(List<FlightRecordEntity> flightRecordsToBeFound,
                               List<FlightRecordEntity> flightRecordsNotToBeFound,
                               List<FlightRecordEntity> flightRecordsForNotFlyingDrone
    ){
        persistDroneWithFlightRecord(flightRecordsToBeFound, "flyingDroneToBeFound", true, "modelToBeFound");
        persistDroneWithFlightRecord(flightRecordsNotToBeFound, "flyingDroneNotToBeFound", true, "modelNotToBeFound");

        var flyingDroneWithNoRecord = new DroneEntityFixtureBuilder().withRegistrationNumber("flyingDroneWithNoRecords").build();
        fakeDb.persistAndFlush(flyingDroneWithNoRecord);

        persistDroneWithFlightRecord(flightRecordsForNotFlyingDrone, "notFlyingDroneWithRecords", false, "modelToBeFound");
    }

    private void persistDroneWithFlightRecord(List<FlightRecordEntity> flightRecords, String droneRegNumber, boolean isFlying, String model){
        for (var flightRecord : flightRecords){
            fakeDb.persistAndFlush(flightRecord);
        }

        var drone = new DroneEntityFixtureBuilder()
                .withRegistrationNumber(droneRegNumber)
                .withIsAirbourne(isFlying)
                .withFlyingRecords(flightRecords)
                .withModel(model)
                .build();
        fakeDb.persistAndFlush(drone);

        for (var flightRecord : flightRecords){
            flightRecord.setDrone(drone);
            fakeDb.persistAndFlush(flightRecord);
        }
    }
}
