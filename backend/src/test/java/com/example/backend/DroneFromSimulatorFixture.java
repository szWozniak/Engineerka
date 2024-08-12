package com.example.backend;

import com.example.backend.listener.model.DroneFromSimulator;

import java.time.LocalDate;
import java.time.LocalTime;

public class DroneFromSimulatorFixture {

    public static DroneFromSimulator DefaultDrone = new DroneFromSimulator(
            "filename",
            "server",
            LocalDate.now(),
            LocalTime.now(),
            "flag",
            "id",
            "idExt",
            "500402N",
            "0195722E",
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
}
