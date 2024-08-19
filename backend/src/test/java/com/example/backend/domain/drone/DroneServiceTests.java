package com.example.backend.domain.drone;

import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import com.example.backend.domain.flightRecord.FlightRecordEntityFixture;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class DroneServiceTests {
    private DroneService sut;
    private DroneRepository droneRepository;
    private FlightRecordRepository flightRecordRepository;
    private FlightRepository flightRepository;

    @BeforeEach
    public void setUp()
    {
        droneRepository = Mockito.mock(DroneRepository.class);
        flightRecordRepository = Mockito.mock(FlightRecordRepository.class);
        flightRepository = Mockito.mock(FlightRepository.class);
    }
    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_WithOnlyThreeLastPositions(){
        //prepare
        Mockito.when(droneRepository.getDroneEntitiesByIsAirborneIsTrue()).thenReturn(
                List.of(getDroneEntityWithMultipleFlightRecords())
        );

        //act
        var result = sut.getAllCurrentlyFlyingDrones();

        //assert

        Assertions.assertEquals(result.size(), 1);
        var flights = result.get(0).getFlightRecords();

        Assertions.assertEquals(flights.size(), 3);

        Assertions.assertEquals(flights.get(0).getDate(), LocalDate.of(2012, 7, 3));
        Assertions.assertEquals(flights.get(1).getDate(), LocalDate.of(2012, 5, 3));
        Assertions.assertEquals(flights.get(2).getDate(), LocalDate.of(2012, 3, 3));
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_ThatHaveAtLeastOneRegisteredPosition(){
        //prepare

        var droneWithRecords = getDroneEntityWithMultipleFlightRecords();
        var droneWithoutRecords = DroneEntityFixture.getFlyingDrone(new ArrayList<>());

        Mockito.when(droneRepository.getDroneEntitiesByIsAirborneIsTrue()).thenReturn(
                List.of(droneWithRecords, droneWithoutRecords)
        );

        //act
        var result = sut.getAllCurrentlyFlyingDrones();

        //assert
        Assertions.assertEquals(result.size(), 1);

        var drone = result.get(0);

        Assertions.assertEquals(drone, droneWithRecords);
    }

    @Test
    public void ShouldReturnEmptyList_IfNoRegisteredDrones(){
        Mockito.when(droneRepository.getDroneEntitiesByIsAirborneIsTrue()).thenReturn(
          new ArrayList<>()
        );

        var result = sut.getAllCurrentlyFlyingDrones();

        Assertions.assertEquals(result.size(), 0);
    }

    private DroneEntity getDroneEntityWithMultipleFlightRecords(){
        List<FlightRecordEntity> flightRecords = List.of(
                FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 3, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 2, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 7, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 1, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 5, 3),
                        LocalTime.of(3, 3, 3, 3))
        );

        var droneEntity = new DroneEntity(
                "megaDroniarz",
                true,
                "Hawana",
                "Michael Jackson",
                3,
                "pink",
                "szybcior",
                "znak",
                "fasd"
        );
        droneEntity.setFlightRecords(flightRecords);

        return droneEntity;
    }
}
