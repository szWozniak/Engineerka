package com.example.backend.drone;

import com.example.backend.drone.dto.DroneDto;
import com.example.backend.event.model.registration.DroneToRegister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/{identification}")
    public ResponseEntity<DroneDto> getDroneByIdentification(@PathVariable int identification) {
        DroneEntity drone = droneService.getDroneByIdentification(identification);

        DroneDto dto = DroneDto.fromDroneEntity(drone);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
