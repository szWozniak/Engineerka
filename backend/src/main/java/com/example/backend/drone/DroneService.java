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
}
