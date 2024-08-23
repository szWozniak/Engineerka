package com.example.backend.domain.drone;

import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.events.recordRegistration.model.envelope.RegistrationFlag;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class DroneEntity {
    @Id
    @Getter
    @Setter
    private String registrationNumber;
    @Getter
    @Setter
    private boolean isAirborne;
    @Getter
    @Setter
    private String country;
    @Getter
    @Setter
    private String operator;
    @Getter
    @Setter
    private int identification;
    @Getter
    @Setter
    private String identificationLabel;
    @Getter
    @Setter
    private String model;
    @Getter
    @Setter
    private String sign;
    @Getter
    @Setter
    private String type;

    @OneToMany
    @Getter
    @Setter
    private List<FlightRecordEntity> flightRecords;

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
