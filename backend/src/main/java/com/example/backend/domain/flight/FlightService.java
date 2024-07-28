package com.example.backend.domain.flight;

import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.DroneRecordToRegister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightService {
    private final DroneRepository droneRepository;
    private final FlightRepository flightRepository;
    private final FlightRecordRepository flightRecordRepository;

    public FlightService(FlightRepository flightRepository, DroneRepository droneRepository, FlightRecordRepository flightRecordRepository) {
        this.flightRepository = flightRepository;
        this.droneRepository = droneRepository;
        this.flightRecordRepository = flightRecordRepository;
    }

    public void CreateFlights(List<DroneRecordToRegister> droneRecords){
        List<FlightEntity> flightsToSave = new ArrayList<>();
        List<FlightRecordEntity> flightRecordsToUpdate = new ArrayList<>();

        for (var droneRecord : droneRecords){
            var flight = new FlightEntity();
            flightRepository.save(flight);

            var registrationNumber = droneRecord.getRegistrationNumber();

            var flightRecordsForFlight = getAllDroneRecordsFromCurrentFlight(registrationNumber);

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
        System.out.println(registrationNumber);
        var recordsFromCurrentFlight = flightRecordRepository
                .findAllByDrone_RegistrationNumberAndFlight_IdIsNull(registrationNumber);

        System.out.println(recordsFromCurrentFlight.size());
        return recordsFromCurrentFlight;
    }
}
