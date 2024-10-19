package com.example.backend.unit.domain.flight.requests.flightSummaries;

import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flight.requests.flightSummaries.FlightsQuery;
import com.example.backend.unit.domain.drone.DroneEntityFixtureBuilder;
import com.example.backend.unit.domain.flightRecord.FlightRecordEntityFixtureBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
public class FlightsQueryTests {
    private FlightsQuery sut;
    @Autowired
    private TestEntityManager fakeDb;
    @Autowired
    private FlightRepository flightRepository;

    @BeforeEach
    public void setUp(){
        sut = new FlightsQuery(flightRepository);
        setupDatabase();
    }

    @Test
    public void ShouldReturnAllFlights_ForDrone1(){
        var result = sut.execute("drone1", new ArrayList<>());
        Assertions.assertEquals(2, result.size());
//        Assertions.assertEquals(1L, result.get(0).getId());
//        Assertions.assertEquals(2L, result.get(1).getId());
    }

    private void setupDatabase(){
        var drone = new DroneEntityFixtureBuilder().withRegistrationNumber("drone1").withIsAirbourne(true).build();
        var drone2 = new DroneEntityFixtureBuilder().withRegistrationNumber("drone2").withIsAirbourne(true).build();

        fakeDb.persistAndFlush(drone);
        fakeDb.persistAndFlush(drone2);

        var flightRecordForFirstFlight1 = new FlightRecordEntityFixtureBuilder().withId("flightRecord1").build();
        var flightRecordForFirstFlight2 = new FlightRecordEntityFixtureBuilder().withId("flightRecord2").build();
        var flightRecordForSecondFlight1 = new FlightRecordEntityFixtureBuilder().withId("flightRecord3").build();
        var flightRecordForSecondFlight2 = new FlightRecordEntityFixtureBuilder().withId("flightRecord4").build();

        fakeDb.persistAndFlush(flightRecordForFirstFlight1);
        fakeDb.persistAndFlush(flightRecordForFirstFlight2);
        fakeDb.persistAndFlush(flightRecordForSecondFlight1);
        fakeDb.persistAndFlush(flightRecordForSecondFlight2);

        drone.setFlightRecords(List.of(flightRecordForFirstFlight1, flightRecordForFirstFlight2));
        drone2.setFlightRecords(List.of(flightRecordForSecondFlight1, flightRecordForSecondFlight2));

        fakeDb.persistAndFlush(drone);
        fakeDb.persistAndFlush(drone2);
        fakeDb.persistAndFlush(flightRecordForFirstFlight1);
        fakeDb.persistAndFlush(flightRecordForFirstFlight2);
        fakeDb.persistAndFlush(flightRecordForSecondFlight1);
        fakeDb.persistAndFlush(flightRecordForSecondFlight2);

        var flight1 = new FlightEntity();
        var flight2 = new FlightEntity();

        fakeDb.persistAndFlush(flight1);
        fakeDb.persistAndFlush(flight2);

        flight1.summarizeFlight(List.of(flightRecordForFirstFlight1, flightRecordForFirstFlight2), true);
        flight2.summarizeFlight(List.of(flightRecordForSecondFlight1, flightRecordForSecondFlight2), false);

        flightRecordForFirstFlight1.setFlight(flight1);
        flightRecordForFirstFlight2.setFlight(flight1);
        flightRecordForSecondFlight1.setFlight(flight2);
        flightRecordForSecondFlight2.setFlight(flight2);

        fakeDb.persistAndFlush(flight1);
        fakeDb.persistAndFlush(flight2);
        fakeDb.persistAndFlush(flightRecordForFirstFlight1);
        fakeDb.persistAndFlush(flightRecordForFirstFlight2);
        fakeDb.persistAndFlush(flightRecordForSecondFlight1);
        fakeDb.persistAndFlush(flightRecordForSecondFlight2);
    }
}
