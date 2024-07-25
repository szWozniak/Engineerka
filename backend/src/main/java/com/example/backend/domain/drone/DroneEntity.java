package com.example.backend.domain.drone;

import com.example.backend.event.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.event.events.recordRegistration.model.envelope.RegistrationFlag;
import com.example.backend.domain.position.FlighRecordEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class DroneEntity {
    @Id
    private String registrationNumber;
    private boolean isAirborne;
    private String country;
    private String operator;
    private int identification;
    private String identificationLabel;
    private String model;
    private String sign;
    private String type;

    @OneToMany
    private List<FlighRecordEntity> flightRecords;

    public DroneEntity(){}

    public DroneEntity(String registrationNumber,
                       boolean isAirborne, String country,
                       String operator, int identification,
                       String identificationLabel, String model, String sign,
                       String type){
        this.registrationNumber = registrationNumber;
        this.isAirborne = isAirborne;
        this.country = country;
        this.operator = operator;
        this.identification = identification;
        this.identificationLabel = identificationLabel;
        this.model = model;
        this.sign = sign;
        this.type = type;
        this.flightRecords = new ArrayList<>();
    }

    public static DroneEntity fromDroneToRegister(DroneRecordToRegister drone){
        return new DroneEntity(drone.getRegistrationNumber(),
                RegistrationFlag.MapToAirbourne(drone.getFlightRecord().getFlag()),
                drone.getCountry(),
                drone.getOperator(),
                drone.getIdentification().getValue(),
                drone.getIdentificationLabel(),
                drone.getModel(),
                drone.getSign(),
                drone.getType());
    }
}
