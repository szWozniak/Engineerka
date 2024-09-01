package com.example.backend.domain.drone.dto;

import com.example.backend.domain.drone.DroneEntity;
import lombok.Data;

import java.util.Optional;

@Data
public class DroneDto {
    private final String registrationNumber;
    private final String country;
    private final String operator;
    private final int identification;
    private final String model;
    private final String sign;
    private final String type;
    private final Optional<Integer> heading;
    private final Optional<Integer> speed;
    private final Optional<Integer> fuel;

    private DroneDto(String registrationNumber, String country, String operator, int identification, String model,
                     String sign, String type, Optional<Integer> heading, Optional<Integer> speed, Optional<Integer> fuel){
        this.registrationNumber = registrationNumber;
        this.country = country;
        this.operator = operator;
        this.identification = identification;
        this.model = model;
        this.sign = sign;
        this.type = type;
        this.heading = heading;
        this.speed = speed;
        this.fuel = fuel;
    }

    public static DroneDto fromDroneEntity(DroneEntity entity){
        var positions = entity.getFlightRecords();
        var currentPosition = positions.get(0);

        return entity.isAirborne() ? new DroneDto(
            entity.getRegistrationNumber(),
            entity.getCountry(),
            entity.getOperator(),
            entity.getIdentification(),
            entity.getModel(),
            entity.getSign(),
            entity.getType(),
            Optional.of(currentPosition.getHeading()),
            Optional.of(currentPosition.getSpeed()),
            Optional.of(currentPosition.getFuel())
        ) : new DroneDto(entity.getRegistrationNumber(),
                entity.getCountry(),
                entity.getOperator(),
                entity.getIdentification(),
                entity.getModel(),
                entity.getSign(),
                entity.getType(),
                null,
                null,
                null);
    }
}
