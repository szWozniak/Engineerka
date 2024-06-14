package com.example.backend.drone;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DroneService {
    private final DroneRepository droneRepository;

    public DroneService(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    public void updateDrones(List<DroneEntity> drones){
        droneRepository.saveAll(drones);
    }

    public List<DroneEntity> getAllByIds(List<String> ids){
        return droneRepository.findAllById(ids);
    }

    public List<DroneEntity> getAllCurrentlyFlyingDrones(){
        var drones = droneRepository.getDroneEntitiesByIsAirborneIsTrue();

        var dronesWithPosition = filterDronesWithoutRegisteredPosition(drones);

        return dronesWithLastThreePositionsIncluded(dronesWithPosition);
    }

    private List<DroneEntity> filterDronesWithoutRegisteredPosition(List<DroneEntity> drones){
        return drones.stream().filter(drone -> drone.getPositions().size() != 0).toList();
    }

    private List<DroneEntity> dronesWithLastThreePositionsIncluded(List<DroneEntity> drones){
        for (var drone : drones){
            drone.getPositions().sort(new RecordTimestampsComparator());
            var positions = drone.getPositions();
            var lastIndex = Math.min(3, positions.size());
            drone.setPositions(positions.subList(0, lastIndex));
        }

        return drones;
    }
}
