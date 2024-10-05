package com.example.backend.integration.drone;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.IDroneFilter;
import com.example.backend.domain.drone.filtering.filters.TextFilter;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
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
public class DronesIntegrationTests {
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
        setupDatabase();
    }

    @Test
    public void ShouldReturnAllDrones_WhenNoFiltersApplied(){
        var result = droneService.getDrones(new ArrayList<>());

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("flyingDroneWithRecords", result.get(0).getRegistrationNumber());
        Assertions.assertEquals("notFlyingDroneWithRecords", result.get(1).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnDrones_WithRegisteredPositions_ThatPassTheFilter(){
        var filter = new TextFilter("registrationNumber", "flyingDroneWithRecords", ComparisonType.Equals);
        List<IDroneFilter> filters = new ArrayList<>();
        filters.add(filter);
        var result = droneService.getDrones(filters);

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneWithRecords", result.get(0).getRegistrationNumber());
    }


    private void setupDatabase(){
        persistDroneWithFlightRecord("1", "flyingDroneWithRecords", true);
        persistDroneWithFlightRecord("2", "notFlyingDroneWithRecords", false);
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
}
