package com.example.backend.domain.flightRecord;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.simulatorIntegration.events.recordRegistration.model.FlightRecordToRegister;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class FlightRecordEntity {
    @Id
    @Getter
    @Setter
    private String id;
    @Getter
    @Setter
    private String filename;
    @Getter
    @Setter
    private String server;
    @Getter
    @Setter
    private LocalDate date;
    @Getter
    @Setter
    private LocalTime time;
    @Getter
    @Setter
    private String flag;
    @Getter
    @Setter
    private String systemId;
    @Getter
    @Setter
    private double latitude;
    @Getter
    @Setter
    private double longitude;
    @Getter
    @Setter
    private int heading;
    @Getter
    @Setter
    private int speed;
    @Getter
    @Setter
    private int altitude;
    @Getter
    @Setter
    private int fuel;

    @ManyToOne
    @Getter
    @Setter
    private DroneEntity drone;

    @ManyToOne
    @Getter
    @Setter
    private FlightEntity flight;
    public FlightRecordEntity(){}

    public FlightRecordEntity(FlightRecordToRegister position) {
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
