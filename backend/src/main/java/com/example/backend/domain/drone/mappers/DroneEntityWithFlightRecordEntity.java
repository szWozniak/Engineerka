package com.example.backend.domain.drone.mappers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.position.FlighRecordEntity;

public record DroneEntityWithFlightRecordEntity(DroneEntity drone, FlighRecordEntity position){}