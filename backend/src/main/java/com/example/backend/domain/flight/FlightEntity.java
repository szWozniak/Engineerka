package com.example.backend.domain.flight;

import com.example.backend.domain.drone.RecordTimestampsComparator;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
public class FlightEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Getter
    @Setter
    private Long Id;
    @Getter
    private LocalDate startDate;
    @Getter
    private LocalTime startTime;
    @Getter
    private LocalDate endDate;
    @Getter
    private LocalTime endTime;
    @Getter
    private LocalTime duration;

    @OneToMany
    @Getter
    @Setter
    private List<FlightRecordEntity> flightRecords;

    public void summarizeFlight(List<FlightRecordEntity> flightRecords) {
        this.flightRecords = flightRecords;

        flightRecords.sort(new RecordTimestampsComparator());

        var startDate = flightRecords.get(flightRecords.size()-1).getDate();
        var startTime = flightRecords.get(flightRecords.size()-1).getTime();
        var endDate = flightRecords.get(0).getDate();
        var endTime = flightRecords.get(0).getTime();

        setFlightTimeBoundariesWithDuration(startDate, startTime, endDate, endTime);
    }

    private void setFlightTimeBoundariesWithDuration(LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime ) {
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.duration = calculateDuration(startDate, startTime, endDate, endTime);
    }

    private LocalTime calculateDuration(LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime) throws NullPointerException {
        LocalDateTime startDateTime = LocalDateTime.of(startDate, startTime);
        LocalDateTime endDateTime = LocalDateTime.of(endDate, endTime);

        Duration duration = Duration.between(startDateTime, endDateTime);
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        long seconds = duration.toSecondsPart();

        return LocalTime.of((int) hours, (int) minutes, (int) seconds);
    }
}
