package com.example.backend.domain.drone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DroneRepository extends JpaRepository<DroneEntity, String> {
    List<DroneEntity> getDroneEntitiesByIsAirborneIsTrue();

    Optional<DroneEntity> findByRegistrationNumber(String registrationNumber);
}

