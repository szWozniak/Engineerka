package com.example.backend.domain.drone;

import com.example.backend.domain.drone.dto.DroneDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/drones")
public class DroneController {
    private final DroneService droneService;

    public DroneController(DroneService droneService) {
        this.droneService = droneService;
    }


    @GetMapping("")
    public ResponseEntity<List<DroneDto>> get(){
        var flyingDrones = droneService.getAllCurrentlyFlyingDrones();

        var dtos = flyingDrones.stream().map(DroneDto::fromDroneEntity).toList();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{registration}")
    public ResponseEntity<DroneDto> getDroneWithTrace(@PathVariable String registration) {
        Optional<DroneEntity> drone = droneService.getDroneWithCurrentFlightTrace(registration);

        if (drone.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        DroneDto dto = DroneDto.fromDroneEntity(drone.get());

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
