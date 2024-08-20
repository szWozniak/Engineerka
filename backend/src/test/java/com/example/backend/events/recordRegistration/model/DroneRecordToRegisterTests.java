package com.example.backend.events.recordRegistration.model;

import com.example.backend.simulatorIntegration.model.DroneFromSimulatorFixtureBuilder;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import com.example.backend.events.recordRegistration.model.envelope.Heading;
import com.example.backend.events.recordRegistration.model.envelope.Identification;
import com.example.backend.events.recordRegistration.model.envelope.Latitude;
import com.example.backend.events.recordRegistration.model.envelope.Longitude;
import com.example.backend.events.recordRegistration.model.envelope.RegistrationFlag;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

public class DroneRecordToRegisterTests {

    @Test
    public void ShouldCorrectlyMapToDroneRecordToRegister_GivenCorrectDroneFromSimulator(){
        LocalTime curTime = LocalTime.now();

        var droneFromSimulator = new DroneFromSimulator("filename",
                "server",
                LocalDate.now(),
                curTime,
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
                "sensorLabel");

        var result = DroneRecordToRegister.fromDroneFromSimulator(droneFromSimulator);

        Assertions.assertEquals(result.getCountry(), "Nigeria");
        Assertions.assertEquals(result.getOperator(), "operator");
        Assertions.assertEquals(result.getIdentification(), new Identification(7));
        Assertions.assertEquals(result.getIdentificationLabel(), "Magenta");
        Assertions.assertEquals(result.getModel(), "Twoj_Stary");
        Assertions.assertEquals(result.getRegistrationNumber(), "420-69-2137");
        Assertions.assertEquals(result.getSign(), "sign");
        Assertions.assertEquals(result.getType(), "type");

        FlightRecordToRegister flight = result.getFlightRecord();

        Assertions.assertEquals(flight.getFilename(), "filename");
        Assertions.assertEquals(flight.getServer(), "server");
        Assertions.assertEquals(flight.getTime(), curTime);
        Assertions.assertEquals(flight.getDate(), LocalDate.now());
        Assertions.assertEquals(flight.getFlag(), RegistrationFlag.DROP);
        Assertions.assertEquals(flight.getSystemId(), "idExt");
        Assertions.assertEquals(flight.getId(), "id");
        Assertions.assertEquals(flight.getLatitude(), new Latitude("50042N"));
        Assertions.assertEquals(flight.getLongitude(), new Longitude("119572E"));
        Assertions.assertEquals(flight.getAltitude(), 50);
        Assertions.assertEquals(flight.getHeading(), new Heading(90));
        Assertions.assertEquals(flight.getSpeed(), 100);
        Assertions.assertEquals(flight.getFuel(), 69);

    }

    @Test
    public void ShouldThrowException_GivenBadLatitude(){
        var drone = new DroneFromSimulatorFixtureBuilder().WithLatitude("XDDD").build();
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> DroneRecordToRegister.fromDroneFromSimulator(drone));
    }

    @Test
    public void ShouldThrowException_GivenBadLongitude(){
        var drone = new DroneFromSimulatorFixtureBuilder().WithLongitude("XDDD").build();
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> DroneRecordToRegister.fromDroneFromSimulator(drone));
    }

    @Test
    public void ShouldThrowException_GivenBadHeading(){
        var drone = new DroneFromSimulatorFixtureBuilder().WithHeading(2137).build();
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> DroneRecordToRegister.fromDroneFromSimulator(drone));
    }

    @Test
    public void ShouldThrowException_GivenBadIdentification(){
        var drone = new DroneFromSimulatorFixtureBuilder().WithIdentification(420).build();
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> DroneRecordToRegister.fromDroneFromSimulator(drone));
    }
}
