package com.example.backend.domain.flight;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<FlightEntity, Long> {
    List<FlightEntity> findDistinctByFlightRecords_Drone_RegistrationNumberAndFlightRecords_FlightIsNotNull(String droneId);
}
