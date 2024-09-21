package com.example.backend.domain.flight.dto;

import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flightRecord.dto.FlightRecordSummaryDto;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class FlightSummaryDto {
    private Long id;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalDate endDate;
    private LocalTime endTime;
    private LocalTime duration;
    private double averageSpeed;
    private int elevationGain;
    private double distance;
    private List<FlightRecordSummaryDto> flightRecords;

    private FlightSummaryDto(Long id, LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime, LocalTime duration, double averageSpeed, int elevationGain, double distance, List<FlightRecordSummaryDto> flightRecords) {
        this.id = id;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.duration = duration;
        this.averageSpeed = averageSpeed;
        this.elevationGain = elevationGain;
        this.distance = distance;
        this.flightRecords = flightRecords;
    }

    public static FlightSummaryDto fromFlightEntity(FlightEntity flightEntity) {
        return new FlightSummaryDto(
                flightEntity.getId(),
                flightEntity.getStartDate(),
                flightEntity.getStartTime(),
                flightEntity.getEndDate(),
                flightEntity.getEndTime(),
                flightEntity.getDuration(),
                flightEntity.getAverageSpeed(),
                flightEntity.getElevationGain(),
                flightEntity.getDistance(),
                flightEntity.getFlightRecords().stream().map(FlightRecordSummaryDto::fromFlightRecordEntity).toList());
    }
}
