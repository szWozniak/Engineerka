package com.example.backend.domain.drone;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.drone.mappers.DroneEntityWithFlightRecordEntity;
import com.example.backend.domain.position.FlightRecordRepository;
import com.example.backend.event.events.recordRegistration.model.DroneRecordToRegister;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<DroneEntity> getAllByIds(List<String> ids){
        return droneRepository.findAllById(ids);
    }

    public List<DroneEntity> getAllCurrentlyFlyingDrones(){
        var drones = droneRepository.getDroneEntitiesByIsAirborneIsTrue();

        var dronesWithPosition = filterDronesWithoutRegisteredPosition(drones);

        return dronesWithLastThreePositionsIncluded(dronesWithPosition);
    }

    public DroneEntity getDroneWithTrace(String registration) {
        List<DroneEntity> drones = droneRepository.findByRegistrationNumber(registration);
        
        if (!drones.isEmpty()) {
            var drone = drones.get(0);
            drone.getFlightRecords().sort(new RecordTimestampsComparator());
            return drones.get(0);
        } else {
            return null;
        }
    }

    public void UpsertDronesRecords(List<DroneRecordToRegister> drones){
        var dronesToRegisterRegistrationNumbers = drones.stream().map(DroneRecordToRegister::getRegistrationNumber).toList();
        var curDrones = getAllByIds(dronesToRegisterRegistrationNumbers);
;
        var entitiesToSave = this.droneToRegisterMapper.mapToEntities(drones, curDrones);

        this.flightRecordRepository.saveAll(entitiesToSave
                .stream()
                .map(DroneEntityWithFlightRecordEntity::position)
                .toList());
        this.droneRepository
                .saveAll(entitiesToSave
                        .stream()
                        .map(DroneEntityWithFlightRecordEntity::drone)
                        .toList());
    }

    private List<DroneEntity> filterDronesWithoutRegisteredPosition(List<DroneEntity> drones){
        return drones.stream().filter(drone -> drone.getFlightRecords().size() != 0).toList();
    }

    private List<DroneEntity> dronesWithLastThreePositionsIncluded(List<DroneEntity> drones){
        for (var drone : drones){
            drone.getFlightRecords().sort(new RecordTimestampsComparator());
            var positions = drone.getFlightRecords();
            var lastIndex = Math.min(3, positions.size());
            drone.setFlightRecords(positions.subList(0, lastIndex));
        }

        return drones;
    }
}
