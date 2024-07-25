package com.example.backend.domain.drone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DroneRepository extends JpaRepository<DroneEntity, String> {
    List<DroneEntity> getDroneEntitiesByIsAirborneIsTrue();

    List<DroneEntity> findByRegistrationNumber(String registrationNumber);
}
