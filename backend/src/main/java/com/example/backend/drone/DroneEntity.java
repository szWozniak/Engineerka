package com.example.backend.drone;

import com.example.backend.event.model.registration.DroneToRegister;
import com.example.backend.event.model.registration.envelope.RegistrationFlag;
import com.example.backend.position.PositionEntity;
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
    private List<PositionEntity> positions;

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
        this.positions = new ArrayList<>();
    }

    public DroneEntity(DroneToRegister drone){
        this.registrationNumber = drone.getRegistrationNumber();
        this.isAirborne = RegistrationFlag.MapToAirbourne(drone.getPosition().getFlag());
        this.country = drone.getCountry();
        this.operator = drone.getOperator();
        this.identification = drone.getIdentification().getValue();
        this.identificationLabel = drone.getIdentificationLabel();
        this.model = drone.getModel();
        this.sign = drone.getSign();
        this.type = drone.getType();
        this.positions = new ArrayList<>();
    }
}
