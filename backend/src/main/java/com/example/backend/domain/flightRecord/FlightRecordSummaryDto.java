package com.example.backend.domain.flightRecord;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class FlightRecordSummaryDto {
        private LocalDate date;
        private LocalTime time;
        private double latitude;
        private double longitude;
        private int heading;
        private int speed;
        private int altitude;
        private int fuel;

        private FlightRecordSummaryDto(LocalDate date, LocalTime Time, double latitude, double longitude, int heading, int speed, int altitude, int fuel) {
            this.date = date;
            this.time = Time;
            this.latitude = latitude;
            this.longitude = longitude;
            this.heading = heading;
            this.speed = speed;
            this.altitude = altitude;
            this.fuel = fuel;
        }

        public static FlightRecordSummaryDto fromFlightRecordEntity(FlightRecordEntity flightRecordEntity) {
            return new FlightRecordSummaryDto(flightRecordEntity.getDate(),
                    flightRecordEntity.getTime(),
                    flightRecordEntity.getLatitude(),
                    flightRecordEntity.getLongitude(),
                    flightRecordEntity.getHeading(),
                    flightRecordEntity.getSpeed(),
                    flightRecordEntity.getAltitude(),
                    flightRecordEntity.getFuel());
        }
}
