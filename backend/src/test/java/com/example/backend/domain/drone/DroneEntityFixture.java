package com.example.backend.domain.drone;

import com.example.backend.domain.flightRecord.FlightRecordEntity;

import java.util.List;

public class DroneEntityFixture {

    private static DroneEntity getDefaultDrone(List<FlightRecordEntity> flights, boolean isAirbourne){
        var drone = new DroneEntity(
                "megaDroniarz",
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

    public static DroneEntity getFlyingDrone(List<FlightRecordEntity> flights){
        return getDefaultDrone(flights, true);
    }

    public static DroneEntity getNotFlyingDrone(List<FlightRecordEntity> flights){
        return getDefaultDrone(flights, false);
    }
}
