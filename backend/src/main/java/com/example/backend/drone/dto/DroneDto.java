package com.example.backend.drone.dto;

import com.example.backend.drone.DroneController;
import com.example.backend.drone.DroneEntity;
import lombok.Data;

import java.util.List;

@Data
public class DroneDto {
    private final String registrationNumber;
    private final String country;
    private final String operator;
    private final int identification;
    private final String model;
    private final String sign;
    private final String type;
    private final int heading;
    private final int speed;
    private final int fuel;
    private final PositionDto currentPosition;
    private final List<PositionDto> trace;

    public DroneDto(String registrationNumber, String country, String operator, int identification, String model,
                    String sign, String type, int heading, int speed, int fuel,
                    PositionDto currentPosition, List<PositionDto> trace) {
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
        this.currentPosition = currentPosition;
        this.trace = trace;
    }

    public static DroneDto fromDroneEntity(DroneEntity entity){
        var positions = entity.getPositions();
        var currentPosition = positions.get(0);
        var trace = positions
                .subList(1 , positions.size())
                .stream().map(position -> new PositionDto(position.getLatitude(),
                        position.getLongitude(),
                        position.getAltitude()))
                .toList();

         return new DroneDto(
                 entity.getRegistrationNumber(),
                 entity.getCountry(),
                 entity.getOperator(),
                 entity.getIdentification(),
                 entity.getModel(),
                 entity.getSign(),
                 entity.getType(),
                currentPosition.getHeading(),
                currentPosition.getSpeed(),
                currentPosition.getFuel(),
                new PositionDto(currentPosition.getLatitude(), currentPosition.getLongitude(),
                        currentPosition.getAltitude()),
                trace
        );
    }
}
