package com.example.backend.domain.flight.requests;

import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightService;
import com.example.backend.domain.flight.dto.FlightDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/flights")
public class FlightController {
    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightDto> getFlight(@PathVariable Long id) {
        Optional<FlightEntity> flight = flightService.getFlight(id);

        if (flight.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        FlightDto dto = FlightDto.fromFlightEntity(flight.get());

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
