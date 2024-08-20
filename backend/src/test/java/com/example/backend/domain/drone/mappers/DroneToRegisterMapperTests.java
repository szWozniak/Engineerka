package com.example.backend.domain.drone.mappers;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.events.recordRegistration.model.DroneRecordToRegister;
import com.example.backend.simulatorIntegration.model.DroneFromSimulator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class DroneToRegisterMapperTests {
    private DroneToRegisterMapper sut;

    @BeforeEach
    public void setUp() {
        sut = new DroneToRegisterMapper();
    }

    @Test
    public void ShouldCreateNewDroneEntity_DroneToRegisterIsNotPresentInCurrentDrones() {
        var droneToRegister = DroneRecordToRegister.fromDroneFromSimulator(
                new DroneFromSimulator(
                        "filename",
                        "server",
                        LocalDate.of(2012, 1, 1),
                        LocalTime.of(2, 2, 2, 2),
                        "UPD",
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
                        "6969669",
                        "sign",
                        "type",
                        69,
                        "signal",
                        "frequency",
                        "sensorLat",
                        "sensorLon",
                        "sensorLabel"
                )
        );

        List<DroneEntityWithFlightRecordEntity> result = sut.mapToEntities(List.of(droneToRegister),
                new ArrayList<>());

        Assertions.assertEquals(result.size(), 1);

        var droneEntity = result.get(0).drone();

        Assertions.assertEquals(droneEntity.getRegistrationNumber(), "6969669");
        Assertions.assertTrue(droneEntity.isAirborne());
        Assertions.assertEquals(droneEntity.getCountry(), "Nigeria");
        Assertions.assertEquals(droneEntity.getOperator(), "operator");
        Assertions.assertEquals(droneEntity.getIdentification(), 7);
        Assertions.assertEquals(droneEntity.getIdentificationLabel(), "Magenta");
        Assertions.assertEquals(droneEntity.getModel(), "Twoj_Stary");
        Assertions.assertEquals(droneEntity.getSign(), "sign");
        Assertions.assertEquals(droneEntity.getType(), "type");

        var flightRecordEntity = result.get(0).flightRecord();

        Assertions.assertEquals(flightRecordEntity.getFilename(), "filename");
        Assertions.assertEquals(flightRecordEntity.getServer(), "server");
        Assertions.assertEquals(flightRecordEntity.getDate(), LocalDate.of(2012, 1, 1));
        Assertions.assertEquals(flightRecordEntity.getTime(), LocalTime.of(2, 2, 2, 2));
        Assertions.assertEquals(flightRecordEntity.getFlag(), "UPD");
        Assertions.assertEquals(flightRecordEntity.getSystemId(), "id");
        Assertions.assertEquals(flightRecordEntity.getLatitude(), 69.69);
        Assertions.assertEquals(flightRecordEntity.getLatitude(), 69.69);
        Assertions.assertEquals(flightRecordEntity.getHeading(), 90);
        Assertions.assertEquals(flightRecordEntity.getAltitude(), 50);
        Assertions.assertEquals(flightRecordEntity.getFuel(), 69);

    }

    @Test
    public void ShouldReturnEmptyList_WhenNoDronesToRegisterGiven() {
        var result = sut.mapToEntities(new ArrayList<>(), new ArrayList<>());

        Assertions.assertEquals(result.size(), 0);
    }

    @Test
    public void ShouldUpdateExistingDrone_WhenDroneToRegisterPresentInCurrentDrones() {
        var droneToRegister = DroneRecordToRegister.fromDroneFromSimulator(
                new DroneFromSimulator(
                        "filename",
                        "server",
                        LocalDate.of(2012, 1, 1),
                        LocalTime.of(2, 2, 2, 2),
                        "UPD",
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
                        "12345",
                        "sign",
                        "type",
                        69,
                        "signal",
                        "frequency",
                        "sensorLat",
                        "sensorLon",
                        "sensorLabel"
                )
        );

        var existingDrone = new DroneEntity("98765",
                false,
                "filipiny",
                "operatorAleInny",
                2,
                "czarny",
                "zajebisty",
                "znak",
                "spokokolo");

        var result = sut.mapToEntities(List.of(droneToRegister),
                List.of(existingDrone));

        Assertions.assertEquals(result.size(), 1);

        var droneEntity = result.get(0).drone();

        Assertions.assertEquals(droneEntity.getRegistrationNumber(), "98765");
        Assertions.assertFalse(droneEntity.isAirborne());
        Assertions.assertEquals(droneEntity.getCountry(), "filipiny");
        Assertions.assertEquals(droneEntity.getOperator(), "operatorAleInny");
        Assertions.assertEquals(droneEntity.getIdentification(), 2);
        Assertions.assertEquals(droneEntity.getIdentificationLabel(), "czarny");
        Assertions.assertEquals(droneEntity.getModel(), "zajebisty");
        Assertions.assertEquals(droneEntity.getSign(), "znak");
        Assertions.assertEquals(droneEntity.getType(), "spokokolo");

        var flightRecordEntity = result.get(0).flightRecord();

        Assertions.assertEquals(flightRecordEntity.getFilename(), "filename");
        Assertions.assertEquals(flightRecordEntity.getServer(), "server");
        Assertions.assertEquals(flightRecordEntity.getDate(), LocalDate.of(2012, 1, 1));
        Assertions.assertEquals(flightRecordEntity.getTime(), LocalTime.of(2, 2, 2, 2));
        Assertions.assertEquals(flightRecordEntity.getFlag(), "UPD");
        Assertions.assertEquals(flightRecordEntity.getSystemId(), "id");
        Assertions.assertEquals(flightRecordEntity.getLatitude(), 69.69);
        Assertions.assertEquals(flightRecordEntity.getLatitude(), 69.69);
        Assertions.assertEquals(flightRecordEntity.getHeading(), 90);
        Assertions.assertEquals(flightRecordEntity.getAltitude(), 50);
        Assertions.assertEquals(flightRecordEntity.getFuel(), 69);
    }
}
