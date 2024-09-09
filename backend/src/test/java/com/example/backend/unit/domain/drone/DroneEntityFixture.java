package com.example.backend.unit.domain.drone;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flightRecord.FlightRecordEntity;

import java.util.List;

public class DroneEntityFixture {

    private static DroneEntity getDefaultDrone(List<FlightRecordEntity> flights, boolean isAirbourne, String registrationNumber){
        var drone = new DroneEntity(
                registrationNumber,
                isAirbourne,
                "Hawana",
                "Michael Jackson",
                3,
                "pink",
                "szybcior",
                "znak",
                "fasd"
        );

        drone.setFlightRecords(flights);

        return drone;
    }

    public static DroneEntity getFlyingDrone(List<FlightRecordEntity> flights, String registrationNumber){
        return getDefaultDrone(flights, true, registrationNumber);
    }

    public static DroneEntity getNotFlyingDrone(List<FlightRecordEntity> flights, String registrationNumber){
        return getDefaultDrone(flights, false, registrationNumber);
    }
}
