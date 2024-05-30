package com.example.backend.drone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DroneRepository extends JpaRepository<DroneEntity, String> {

}
