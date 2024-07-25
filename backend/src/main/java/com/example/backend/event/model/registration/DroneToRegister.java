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
    private final FlightRecordToRegister position;

    private DroneToRegister(String country, String operator, Identification identification, String identificationLabel,
                            String model, String registrationNumber, String sign, String type, FlightRecordToRegister position){
        this.country = country;
        this.operator = operator;
        this.identification = identification;
        this.identificationLabel = identificationLabel;
        this.model = model;
        this.registrationNumber = registrationNumber;
        this.sign = sign;
        this.type = type;
        this.position = position;
    }

    public static DroneToRegister fromDroneFromSimulator(DroneFromSimulator droneFromSimulator){
        return new DroneToRegister(droneFromSimulator.getCountry(),
                droneFromSimulator.getOperator(),
                new Identification(droneFromSimulator.getIdentification()),
                droneFromSimulator.getIdentificationLabel(),
                droneFromSimulator.getModel(),
                droneFromSimulator.getRegistrationNumber(),
                droneFromSimulator.getSign(),
                droneFromSimulator.getType(),
                FlightRecordToRegister.fromDroneFromSimulator(droneFromSimulator));
    }
}