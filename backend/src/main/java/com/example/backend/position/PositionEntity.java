package com.example.backend.position;

import com.example.backend.event.model.droneToRegister.PositionToRegister;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class PositionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id; //TODO: change to id given from simulator after simulator gives random id (extID)
    private String filename;
    private String serwer;
    private LocalDate date;
    private LocalTime time;
    private String flag;
    private String systemId;
    private double latitude;
    private double longitude;
    private int heading;
    private int speed;
    private int altitude;
    private int fuel;
    public PositionEntity(){}

    public PositionEntity(PositionToRegister position) {
        this.filename = position.getFilename();
        this.serwer = position.getSerwer();
        this.date = position.getDate();
        this.time = position.getTime();
        this.flag = position.getFlag().toString();
        this.systemId = position.getSystemId();
        this.latitude = position.getLatitude().getValue();
        this.longitude = position.getLongitude().getValue();
        this.heading = position.getHeading().getValue();
        this.speed = position.getSpeed();
        this.altitude = position.getAltitude();
        this.fuel = position.getFuel();
    }
}
