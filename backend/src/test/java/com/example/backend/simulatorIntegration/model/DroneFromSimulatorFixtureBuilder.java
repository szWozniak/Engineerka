package com.example.backend.simulatorIntegration.model;

import com.example.backend.events.recordRegistration.model.envelope.RegistrationFlag;

import java.time.LocalDate;
import java.time.LocalTime;

public class DroneFromSimulatorFixtureBuilder {
    private DroneFromSimulator drone = new DroneFromSimulator(
            "filename",
            "server",
            LocalDate.now(),
            LocalTime.now(),
            "DROP",
            "id",
            "idExt",
            "50042N",
            "119572E",
            90,
            100,
            50,
            "Nigeria",
            "operator",
            7,
            "Magenta",
            "Twoj_Stary",
            "420-69-2137",
            "sign",
            "type",
            69,
            "signal",
            "frequency",
            "sensorLat",
            "sensorLon",
            "sensorLabel"
    );

    public DroneFromSimulator build(){
        return drone;
    }

    public DroneFromSimulatorFixtureBuilder WithLatitude(String lat){
        drone.setLatitude(lat);
        return this;
    }

    public DroneFromSimulatorFixtureBuilder WithLongitude(String lon){
        drone.setLongitude(lon);
        return this;
    }

    public DroneFromSimulatorFixtureBuilder WithHeading(int heading){
        drone.setHeading(heading);
        return this;
    }

    public DroneFromSimulatorFixtureBuilder WithIdentification(int identification){
        drone.setIdentification(identification);
        return this;
    }

    public DroneFromSimulatorFixtureBuilder WithFlag(String flag){
        drone.setFlag(flag);
        return this;
    }

    public DroneFromSimulatorFixtureBuilder WithRegistrationNumber(String regNumber){
        drone.setRegistrationNumber(regNumber);
        return this;
    }
}
