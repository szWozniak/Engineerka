package com.example.backend.domain.position;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlightRecordRepository extends JpaRepository<FlighRecordEntity, String> {
    public Optional<FlighRecordEntity> findFirstByFilename(String filename);
}
