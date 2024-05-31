package com.example.backend.position.model;

import com.example.backend.drone.model.envelope.RegistrationFlag;
import com.example.backend.position.PositionRepository;
import com.example.backend.position.model.envelope.Heading;
import com.example.backend.position.model.envelope.Latitude;
import com.example.backend.position.model.envelope.Longitude;
import com.example.backend.scheduler.model.DroneReadmodel;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class PositionToRegister {
    private String filename;
    private String serwer;
    private LocalTime time;
    private LocalDate date;
    private RegistrationFlag flag;
    private String systemId;
    private String id; //unique id given by simulator
    private Latitude latitude;
    private Longitude longitude;
    private int altitude;
    private Heading heading;
    private int speed;

    public PositionToRegister(DroneReadmodel model) {
        this.filename = model.getFilename();
        this.serwer = model.getSerwer();
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
    }

}
