package com.example.backend.position;

import com.example.backend.event.model.registration.PositionToRegister;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class PositionEntity {
    @Id
    private String id;
    private String filename;
    private String server;
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
        this.id = position.getId();
        this.filename = position.getFilename();
        this.server = position.getServer();
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
