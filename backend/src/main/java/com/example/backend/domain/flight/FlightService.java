package com.example.backend.domain.flight;

import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    private final FlightRepository flightRepository;
    private final FlightRecordRepository flightRecordRepository;

    public FlightService(FlightRepository flightRepository, FlightRecordRepository flightRecordRepository) {
        this.flightRepository = flightRepository;
        this.flightRecordRepository = flightRecordRepository;
    }

    public void createFlights(List<String> droneRegistrationNumbers){
        List<FlightEntity> flightsToSave = new ArrayList<>();
        List<FlightRecordEntity> flightRecordsToUpdate = new ArrayList<>();

        for (var registrationNumber : droneRegistrationNumbers){
            var flight = new FlightEntity();
            var flightRecordsForFlight = getAllDroneRecordsFromCurrentFlight(registrationNumber);

            flight.summarizeFlight(flightRecordsForFlight);
            flightRepository.save(flight);

            for (var flightRecordEntity : flightRecordsForFlight){
                flightRecordEntity.setFlight(flight);
            }

            flight.setFlightRecords(flightRecordsForFlight);

            flightsToSave.add(flight);
            flightRecordsToUpdate.addAll(flightRecordsForFlight);
        }

        flightRecordRepository.saveAll(flightRecordsToUpdate);
        flightRepository.saveAll(flightsToSave);
    }

    private List<FlightRecordEntity> getAllDroneRecordsFromCurrentFlight(String registrationNumber){
        var recordsFromCurrentFlight = flightRecordRepository
                .findAllByDrone_RegistrationNumberAndFlight_IdIsNull(registrationNumber);

        return recordsFromCurrentFlight;
    }

    public Optional<FlightEntity> getFlight(Long id){
        return flightRepository.findById(id);
    }
}
