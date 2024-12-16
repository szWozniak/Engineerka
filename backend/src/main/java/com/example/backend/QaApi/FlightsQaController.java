package com.example.backend.QaApi;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
        DeleteFlightForTestDrone();
        AddFlightForTestDrone();

        return new ResponseEntity<>("poszlo", HttpStatus.OK);
    }

    @Transactional
    private void DeleteFlightForTestDrone(){
        var testDrone = droneRepository.findByRegistrationNumber("TEST123").get();

        var testDroneFlights = testDrone.getFlightRecords();
        testDrone.setFlightRecords(new ArrayList<>());

        var distinctFlights = testDroneFlights
                .stream()
                .map(f -> f.getFlight())
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        if (distinctFlights.size() == 0){
            return;
        }

        if (distinctFlights.size() != 1){
            throw new IllegalStateException("Test drone cannot have more than 1 flight");
        }

        distinctFlights.get(0).setFlightRecords(new ArrayList<>());

        flightRecordRepository.deleteAll(testDroneFlights);
        flightRepository.deleteAll(distinctFlights);
        droneRepository.save(testDrone);
    }

    @Transactional
    private void AddFlightForTestDrone(){
        var testDrone = droneRepository.findByRegistrationNumber("TEST123").get();

        var record1 = new FlightRecordEntity(
                "1203214521",
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
                10,
                20
        );
        record1.setDrone(testDrone);

        var record2 = new FlightRecordEntity(
                "421321321",
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
                100,
                15
        );
        record2.setDrone(testDrone);

        var record3 = new FlightRecordEntity(
                "42156116",
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
                400,
                10
        );
        record3.setDrone(testDrone);

        var record4 = new FlightRecordEntity(
                "92317452",
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
                1000,
                5
        );
        record4.setDrone(testDrone);

        var listOfFlightRecords = new ArrayList<FlightRecordEntity>();
        listOfFlightRecords.add(record1);
        listOfFlightRecords.add(record2);
        listOfFlightRecords.add(record3);
        listOfFlightRecords.add(record4);

        flightRecordRepository.save(record1);
        flightRecordRepository.save(record2);
        flightRecordRepository.save(record3);
        flightRecordRepository.save(record4);

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
        flightRecordRepository.save(record1);
        flightRecordRepository.save(record2);
        flightRecordRepository.save(record3);
        flightRecordRepository.save(record4);
    }
}
