package com.example.backend.event.model.droneToRegister;

import com.example.backend.event.model.droneToRegister.envelope.Identification;
import com.example.backend.scheduler.model.DroneReadmodel;
import lombok.Data;

@Data
public class DroneToRegister{

    private final String country;
    private final String operator;
    private final Identification identification;
    private final String model;
    private final String registrationNumber;
    private final String sign;
    private final String type;
    private final int fuel;
    private final PositionToRegister position;

    public DroneToRegister(DroneReadmodel model){
        this.country = model.getCountry();
        this.operator = model.getOperator();
        this.identification = new Identification(model.getIdentification());
        this.model = model.getModel();
        this.registrationNumber = model.getRegistrationNumber();
        this.sign = model.getSign();
        this.type = model.getType();
        this.fuel = model.getFuel();
        this.position = new PositionToRegister(model);
    }
}