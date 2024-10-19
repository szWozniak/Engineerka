package com.example.backend.unit.domain.flight.requests.flightSummaries;

import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flight.requests.flightSummaries.FlightsQuery;
import com.example.backend.unit.domain.drone.DroneEntityFixtureBuilder;
import com.example.backend.unit.domain.flightRecord.FlightRecordEntityFixtureBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

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

    private void setupDatabase(){
        var drone = new DroneEntityFixtureBuilder().withRegistrationNumber("dron1").withIsAirbourne(true).build();
        var drone2 = new DroneEntityFixtureBuilder().withRegistrationNumber("dron2").withIsAirbourne(true).build();

        fakeDb.persistAndFlush(drone);
        fakeDb.persistAndFlush(drone2);

//        var flight = new FlightEntity();
//        flight.summarizeFlight(List.of(
//                new FlightRecordEntityFixtureBuilder().
//        ));
    }
}
