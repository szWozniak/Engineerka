package com.example.backend.drone;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class DroneEntity {
    @Id
    private String registrationNumber;
    private boolean isAirbourne;
    private String country;
    private String operator;
    private int identification;
//    private String identificationLabel; cokolwiek to jest
    private String model;
    private String sign;
    private String type;
    private int fuel;

    public DroneEntity(){}

    public DroneEntity(String registrationNumber,
                       boolean isAirbourne, String country,
                       String operator, int identification,
                       String model, String sign,
                       String type, int fuel){
        this.registrationNumber = registrationNumber;
        this.isAirbourne = isAirbourne;
        this.country = country;
        this.operator = operator;
        this.identification = identification;
        this.model = model;
        this.sign = sign;
        this.type = type;
        this.fuel = fuel;
    }

}
