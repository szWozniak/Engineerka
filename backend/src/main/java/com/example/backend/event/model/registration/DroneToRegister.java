package com.example.backend.event.model.registration;

import com.example.backend.event.model.registration.envelope.Identification;
import com.example.backend.scheduler.model.DroneFromSimulator;
import lombok.Data;

@Data
public class DroneToRegister{

    private final String country;
    private final String operator;
    private final Identification identification;
    private final String identificationLabel;
    private final String model;
    private final String registrationNumber;
    private final String sign;
    private final String type;
    private final PositionToRegister position;

    public DroneToRegister(DroneFromSimulator model){
        this.country = model.getCountry();
        this.operator = model.getOperator();
        this.identification = new Identification(model.getIdentification());
        this.identificationLabel = model.getIdentificationLabel();
        this.model = model.getModel();
        this.registrationNumber = model.getRegistrationNumber();
        this.sign = model.getSign();
        this.type = model.getType();
        this.position = new PositionToRegister(model);
    }
}