package com.example.backend.integration.drone;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.IDroneFilter;
import com.example.backend.domain.drone.filtering.filters.TextFilter;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.unit.domain.drone.DroneEntityFixture;
import com.example.backend.unit.domain.flightRecord.FlightRecordEntityFixture;
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
    private DroneToRegisterMapper droneToRegisterMapper;

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
        droneToRegisterMapper = new DroneToRegisterMapper();
        droneService = new DroneService(droneRepository, flightRecordRepository, droneToRegisterMapper, flightRepository);
        setupDatabase();
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_WithRegisteredPositions_WhenNoFiltersApplied(){
        var result = droneService.getCurrentlyFlyingDrones(new ArrayList<>());

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("flyingDroneWithRecords1", result.get(0).getRegistrationNumber());
        Assertions.assertEquals("flyingDroneWithRecords2", result.get(1).getRegistrationNumber());
    }

    @Test
    public void ShouldReturnCurrentlyFlyingDrones_WithRegisteredPositions_ThatPassTheFilter(){
        var filter = new TextFilter("registrationNumber", "flyingDroneWithRecords1", ComparisonType.Equals);
        List<IDroneFilter> filters = new ArrayList<>();
        filters.add(filter);
        var result = droneService.getCurrentlyFlyingDrones(filters);

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("flyingDroneWithRecords1", result.get(0).getRegistrationNumber());
    }


    private void setupDatabase(){
        persistDroneWithFlightRecord("1", "flyingDroneWithRecords1", true);
        persistDroneWithFlightRecord("2", "flyingDroneWithRecords2", true);
        var flyingDroneWithNoRecord = DroneEntityFixture.getFlyingDrone(new ArrayList<>(), "flyingDroneWithNoRecords");
        fakeDb.persistAndFlush(flyingDroneWithNoRecord);
        persistDroneWithFlightRecord("notFlyingDroneWithRecords", "3", false);
    }

    private void persistDroneWithFlightRecord(String flightRecordId, String droneRegNumber, boolean isFlying){
        var flightRecord = FlightRecordEntityFixture.getFlightRecordEntityFrom(flightRecordId, LocalDate.now(), LocalTime.now());
        fakeDb.persistAndFlush(flightRecord);

        var drone = isFlying ?
                DroneEntityFixture.getFlyingDrone(List.of(flightRecord), droneRegNumber) :
                DroneEntityFixture.getNotFlyingDrone(List.of(flightRecord), droneRegNumber);
        fakeDb.persistAndFlush(drone);

        flightRecord.setDrone(drone);
        fakeDb.persistAndFlush(flightRecord);
    }


}
