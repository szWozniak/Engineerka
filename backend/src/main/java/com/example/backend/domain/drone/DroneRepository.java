package com.example.backend.domain.drone;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DroneRepository extends JpaRepository<DroneEntity, String>, JpaSpecificationExecutor<DroneEntity> {
    List<DroneEntity> getDroneEntitiesByIsAirborneIsTrue(Specification<DroneEntity> specs);

    Optional<DroneEntity> findByRegistrationNumber(String registrationNumber);
}

