package com.example.backend.domain.drone;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.drone.mappers.DroneEntityWithFlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DroneService {
    private final DroneRepository droneRepository;
    private final FlightRecordRepository flightRecordRepository;
    private final DroneToRegisterMapper droneToRegisterMapper;


    public DroneService(DroneRepository droneRepository, FlightRecordRepository flightRecordRepository, DroneToRegisterMapper droneToRegisterMapper) {
        this.droneRepository = droneRepository;
        this.flightRecordRepository = flightRecordRepository;
        this.droneToRegisterMapper = droneToRegisterMapper;
    }

    public List<DroneEntity> getAllCurrentlyFlyingDrones(){
        var drones = droneRepository.getDroneEntitiesByIsAirborneIsTrue();

        var dronesWithPosition = filterDronesWithoutRegisteredPosition(drones);

        return dronesWithLastThreeRecordsFromCurrentFlightIncluded(dronesWithPosition);
    }

    public Optional<DroneEntity> getDroneWithCurrentFlightTrace(String registration) {
        var foundDrone = droneRepository.findByRegistrationNumber(registration);

        if (foundDrone.isEmpty()){
            return Optional.empty();
        }

        var drone = foundDrone.get();
        var recordsFromCurrentFlight = drone.getFlightRecords()
                .stream().filter(r -> r.getFlight() == null)
                .sorted(new RecordTimestampsComparator())
                .toList();

        drone.setFlightRecords(recordsFromCurrentFlight);
        return Optional.of(drone);
    }

    public void UpsertDronesRecords(List<DroneRecordToRegister> drones){
        var dronesToRegisterRegistrationNumbers = drones.stream().map(DroneRecordToRegister::getRegistrationNumber).toList();
        var curDrones = getAllByIds(dronesToRegisterRegistrationNumbers);

        var entitiesToSave = this.droneToRegisterMapper.mapToEntities(drones, curDrones);


        var droneEntites = entitiesToSave
                .stream()
                .map(DroneEntityWithFlightRecordEntity::drone)
                .toList();
        var flightRecordEntites = entitiesToSave
                .stream()
                .map(DroneEntityWithFlightRecordEntity::flightRecord)
                .toList();

        this.flightRecordRepository.saveAll(flightRecordEntites);
        this.droneRepository
                .saveAll(droneEntites);

        for (var droneWithFlightRecordEntity : entitiesToSave){
            var droneEntity = droneWithFlightRecordEntity.drone();
            var flightRecordEntity = droneWithFlightRecordEntity.flightRecord();

            flightRecordEntity.setDrone(droneEntity);
        }

        this.flightRecordRepository.saveAll(flightRecordEntites);
    }

    private List<DroneEntity> getAllByIds(List<String> ids){
        return droneRepository.findAllById(ids);
    }

    private List<DroneEntity> filterDronesWithoutRegisteredPosition(List<DroneEntity> drones){
        return drones.stream().filter(drone -> drone.getFlightRecords().size() != 0).toList();
    }

    private List<DroneEntity> dronesWithLastThreeRecordsFromCurrentFlightIncluded(List<DroneEntity> drones){
        for (var drone : drones){
            var sortedAndFilteredRecords = drone.getFlightRecords().stream()
                    .filter(fr -> fr.getFlight() == null)
                    .sorted(new RecordTimestampsComparator()).toList();

            var lastIndex = Math.min(3, sortedAndFilteredRecords.size());
            drone.setFlightRecords(sortedAndFilteredRecords.subList(0, lastIndex));
        }

        return drones;
    }
}
