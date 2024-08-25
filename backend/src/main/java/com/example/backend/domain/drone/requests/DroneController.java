package com.example.backend.domain.drone.requests;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.DroneService;
import com.example.backend.domain.drone.dto.DroneDto;
import com.example.backend.domain.drone.dto.FlightSummaryDto;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.drone.filtering.filters.IDroneFilter;
import com.example.backend.domain.drone.requests.currentlyFlyingDrones.GetCurrentlyFlyingDronesRequest;
import com.example.backend.domain.drone.requests.currentlyFlyingDrones.mappers.DroneFiltersMapper;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
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


    @PostMapping("")
    public ResponseEntity<List<DroneDto>> getCurrentlyFlyingDrones(@Valid @RequestBody GetCurrentlyFlyingDronesRequest request) throws BadRequestException{
        List<IDroneFilter> mappedFilters;
        try{
            mappedFilters = DroneFiltersMapper.map(request.textFilters(), request.numberFilters());
        }catch(IllegalArgumentException ex){
            throw new BadRequestException(ex.getMessage());
        }

        var flyingDrones = droneService.getCurrentlyFlyingDrones(mappedFilters);

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

    @GetMapping("/{id}/flights")
    public ResponseEntity<List<FlightSummaryDto>> getFlights(@PathVariable String id) {
        List<FlightEntity> flights = droneService.getDroneFinishedFlights(id);

        List<FlightSummaryDto> flightSummaryDtos = flights.stream().map(FlightSummaryDto::fromFlightEntity).toList();

        return new ResponseEntity<>(flightSummaryDtos, HttpStatus.OK);
    }
}
