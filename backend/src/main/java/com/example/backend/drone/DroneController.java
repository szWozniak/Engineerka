package com.example.backend.drone;

import com.example.backend.event.model.registration.DroneToRegister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/drone")
public class DroneController {
    private final DroneService droneService;

    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }


    @GetMapping("")
    public ResponseEntity<List<DroneDto>> get(){
        var flyingDrones = droneService.getAllCurrentlyFlyingDrones();

        var dtos = flyingDrones.stream().map(this::mapDroneToDto).toList();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    private DroneDto mapDroneToDto(DroneEntity drone){
        var positions = drone.getPositions();
        var currentPosition = positions.get(0);
        var trace = positions
                .subList(1 , positions.size())
                .stream().map(position -> new Position(position.getLatitude(),
                        position.getLongitude(),
                        position.getAltitude()))
                .toList();

        return new DroneDto(
                drone.getRegistrationNumber(),
                drone.getCountry(),
                drone.getOperator(),
                drone.getIdentification(),
                drone.getModel(),
                drone.getSign(),
                drone.getType(),
                currentPosition.getHeading(),
                currentPosition.getSpeed(),
                currentPosition.getFuel(),
                new Position(currentPosition.getLatitude(), currentPosition.getLongitude(),
                        currentPosition.getAltitude()),
                trace
        );

    }

    public record DroneDto(String registrationNumber,
                           String country,
                           String operator,
                           int identification,
                           String model,
                           String sign,
                           String type,
                           int heading,
                           int speed,
                           int fuel,
                           Position currentPosition,
                           List<Position> trace){}
    public record Position(double latitude, double longitude, int altitude){}
}
