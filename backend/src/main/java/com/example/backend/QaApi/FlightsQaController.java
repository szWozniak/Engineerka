package com.example.backend.QaApi;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/qa-api/flights")
public class FlightsQaController {
    private final FlightRepository flightRepository;
    private final DroneRepository droneRepository;
    private final FlightRecordRepository flightRecordRepository;

    public FlightsQaController(FlightRepository flightRepository, DroneRepository droneRepository, FlightRecordRepository flightRecordRepository) {
        this.flightRepository = flightRepository;
        this.droneRepository = droneRepository;
        this.flightRecordRepository = flightRecordRepository;
    }

    @PostMapping
    public ResponseEntity<String> Post(){
        var testDrone = droneRepository.findByRegistrationNumber("TEST123").get();

        var record1 = new FlightRecordEntity(
                "1",
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "UPD",
                "systemId",
                4,
                3,
                30,
                30,
                500,
                20
        );
        record1.setDrone(testDrone);

        var record2 = new FlightRecordEntity(
                "1",
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "UPD",
                "systemId",
                5,
                4,
                30,
                30,
                510,
                15
        );
        record2.setDrone(testDrone);

        var record3 = new FlightRecordEntity(
                "1",
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "UPD",
                "systemId",
                6,
                5,
                30,
                30,
                520,
                10
        );
        record3.setDrone(testDrone);

        var record4 = new FlightRecordEntity(
                "1",
                "filename",
                "server",
                LocalDate.now(),
                LocalTime.now(),
                "EXT",
                "systemId",
                7,
                6,
                30,
                30,
                530,
                5
        );
        record4.setDrone(testDrone);

        var listOfFlightRecords = List.of(record1, record2, record3, record4);

        flightRecordRepository.saveAll(listOfFlightRecords);

        testDrone.setFlightRecords(listOfFlightRecords);

        droneRepository.save(testDrone);

        var flightEntity = new FlightEntity();
        flightRepository.save(flightEntity);

        flightEntity.summarizeFlight(listOfFlightRecords, true);

        record1.setFlight(flightEntity);
        record2.setFlight(flightEntity);
        record3.setFlight(flightEntity);
        record4.setFlight(flightEntity);

        flightRepository.save(flightEntity);
        flightRecordRepository.saveAll(listOfFlightRecords);

        return new ResponseEntity<>("poszlo", HttpStatus.OK);
    }
}
