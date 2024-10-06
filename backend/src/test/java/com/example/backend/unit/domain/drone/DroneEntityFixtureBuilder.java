package com.example.backend.unit.domain.drone;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flightRecord.FlightRecordEntity;

import java.util.List;

public class DroneEntityFixtureBuilder {

    private DroneEntity defaultDrone = new DroneEntity(
                "1",
                false,
                "Hawana",
                "Michael Jackson",
                3,
                "pink",
                "model",
                "znak",
                "fasd"
    );

    public DroneEntityFixtureBuilder withRegistrationNumber(String registrationNumber){
        defaultDrone.setRegistrationNumber(registrationNumber);
        return this;
    }

    public DroneEntityFixtureBuilder withIsAirbourne(boolean isAirbourne){
        defaultDrone.setAirborne(isAirbourne);
        return this;
    }

    public DroneEntityFixtureBuilder withCountry(String country){
        defaultDrone.setCountry(country);
        return this;
    }

    public DroneEntityFixtureBuilder withOperator(String operator){
        defaultDrone.setOperator(operator);
        return this;
    }

    public DroneEntityFixtureBuilder withIdentification(int identification){
        defaultDrone.setIdentification(identification);
        return this;
    }

    public DroneEntityFixtureBuilder withModel(String model){
        defaultDrone.setModel(model);
        return this;
    }

    public DroneEntityFixtureBuilder withType(String type){
        defaultDrone.setType(type);
        return this;
    }

    public DroneEntityFixtureBuilder withFlyingRecords(List<FlightRecordEntity> flyingRecords){
        defaultDrone.setFlightRecords(flyingRecords);
        return this;
    }

    public DroneEntity build(){
        return defaultDrone;
    }
}
