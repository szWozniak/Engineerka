package com.example.backend.domain.drone.dto;

import com.example.backend.domain.flight.FlightEntity;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class FlightSummaryDto {
    private Long id;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalDate endDate;
    private LocalTime endTime;
    private LocalTime duration;

    private FlightSummaryDto(Long id, LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime, LocalTime duration) {
        this.id = id;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.duration = duration;
    }

    public static FlightSummaryDto fromFlightEntity(FlightEntity flightEntity) {
        return new FlightSummaryDto(flightEntity.getId(), flightEntity.getStartDate(), flightEntity.getStartTime(), flightEntity.getEndDate(), flightEntity.getEndTime(), flightEntity.getDuration());
    }
}
