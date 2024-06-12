package com.example.backend.event.model.registration;

import com.example.backend.event.model.registration.envelope.RegistrationFlag;
import com.example.backend.event.model.registration.envelope.Heading;
import com.example.backend.event.model.registration.envelope.Latitude;
import com.example.backend.event.model.registration.envelope.Longitude;
import com.example.backend.scheduler.model.DroneFromSimulator;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class PositionToRegister {
    private String filename;
    private String server;
    private LocalTime time;
    private LocalDate date;
    private RegistrationFlag flag;
    private String systemId;
    private int id;
    private Latitude latitude;
    private Longitude longitude;
    private int altitude;
    private Heading heading;
    private int speed;
    private int fuel;

    public PositionToRegister(DroneFromSimulator model) {
        this.filename = model.getFilename();
        this.server = model.getServer();
        this.time = model.getTime();
        this.date = model.getDate();
        this.flag = RegistrationFlag.valueOf(model.getFlag());
        this.systemId = model.getId();
        this.id = model.getIdExt();
        this.latitude = new Latitude(model.getLatitude());
        this.longitude = new Longitude(model.getLongitude());
        this.altitude = model.getAltitude();
        this.heading = new Heading(model.getHeading());
        this.speed = model.getSpeed();
        this.fuel = model.getFuel();
    }

}
