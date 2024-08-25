package com.example.backend.unit.domain.drone;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneRepository;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.mappers.DroneToRegisterMapper;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import com.example.backend.unit.domain.flightRecord.FlightRecordEntityFixture;
import com.example.backend.domain.flightRecord.FlightRecordRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
public class DroneServiceTests {
    private DroneService sut;
    private DroneRepository droneRepository;
    private FlightRecordRepository flightRecordRepository;
    private FlightRepository flightRepository;
    private DroneToRegisterMapper droneToRegisterMapper;

    @BeforeEach
    public void setUp()
    {
        droneRepository = Mockito.mock(DroneRepository.class);
        flightRecordRepository = Mockito.mock(FlightRecordRepository.class);
        droneToRegisterMapper = Mockito.mock(DroneToRegisterMapper.class);
        flightRepository = Mockito.mock(FlightRepository.class);
        sut = new DroneService(droneRepository, flightRecordRepository, droneToRegisterMapper, flightRepository);
    }

    @Test
    public void ShouldReturnAllCurrentlyFlyingDrones_WithOnlyThreeLastPositions(){
        //prepare
        Mockito.when(droneRepository.findAll(Mockito.<Specification<DroneEntity>>any()))
                .thenReturn(
                List.of(getDroneEntityWithMultipleFlightRecords())
        );

        //act
        var result = sut.getCurrentlyFlyingDrones(new ArrayList<>());

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
        var droneWithoutRecords = DroneEntityFixture.getFlyingDrone(new ArrayList<>(), "megaDroniarz");

        Mockito.when(droneRepository.findAll(Mockito.<Specification<DroneEntity>>any())).thenReturn(
                List.of(droneWithRecords, droneWithoutRecords)
        );

        //act
        var result = sut.getCurrentlyFlyingDrones(new ArrayList<>());

        //assert
        Assertions.assertEquals(result.size(), 1);

        var drone = result.get(0);

        Assertions.assertEquals(drone, droneWithRecords);
    }

    @Test
    public void ShouldReturnEmptyList_IfNoRegisteredDrones(){
        Mockito.when(droneRepository.findAll(Mockito.<Specification<DroneEntity>>any())).thenReturn(
                new ArrayList<>()
        );

        var result = sut.getCurrentlyFlyingDrones(new ArrayList<>());

        Assertions.assertEquals(result.size(), 0);
    }

    @Test
    public void ShouldReturnDrone_WithAllFlightsRecordFromCurrentFlight(){
        //prepare
        var drone = getDroneEntityWithMultipleFlightRecords();
        Mockito.when(droneRepository.findByRegistrationNumber(Mockito.any()))
                .thenReturn(Optional.of(drone));

        //act
        var result = sut.getDroneWithCurrentFlightTrace("krokodyl");

        //assert
        Assertions.assertTrue(result.isPresent());

        var droneWithFlightRecords = result.get();

        Assertions.assertEquals(droneWithFlightRecords.getFlightRecords().size(), 5);
    }

    @Test
    public void ShouldNotReturnFlightRecords_FromPreviousFlights(){
        //prepare
        var flightRecord = FlightRecordEntityFixture.getFlightRecordEntityFrom("10",
                LocalDate.now(),
                LocalTime.now());
        flightRecord.setFlight(new FlightEntity(

        ));

        var drone = DroneEntityFixture.getFlyingDrone(List.of(flightRecord), "megaDroniarz");
        Mockito.when(droneRepository.findByRegistrationNumber(Mockito.any()))
                .thenReturn(Optional.of(drone));

        //act
        var result = sut.getDroneWithCurrentFlightTrace("krokodyl");

        //assert
        Assertions.assertTrue(result.isPresent());
        var droneEntity = result.get();

        Assertions.assertEquals(droneEntity.getFlightRecords().size(), 0);
    }

    @Test
    public void ShouldReturnEmptyOptional_IfDroneNotFound(){
        Mockito.when(droneRepository.findByRegistrationNumber(Mockito.any()))
                .thenReturn(Optional.empty());

        var result = sut.getDroneWithCurrentFlightTrace("krokodylisko");

        Assertions.assertTrue(result.isEmpty());
    }

    private DroneEntity getDroneEntityWithMultipleFlightRecords(){
        var flightRecords = List.of(
                FlightRecordEntityFixture.getFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 3, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.getFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 2, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.getFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 7, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.getFlightRecordEntityFrom("1",
                        LocalDate.of(2012, 1, 3),
                        LocalTime.of(3, 3, 3, 3)),

                FlightRecordEntityFixture.getFlightRecordEntityFrom("1",
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
