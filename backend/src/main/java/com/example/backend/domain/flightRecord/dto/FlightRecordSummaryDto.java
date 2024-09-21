package com.example.backend.domain.flightRecord.dto;

import com.example.backend.domain.flightRecord.FlightRecordEntity;
import lombok.Data;

@Data
public class FlightRecordSummaryDto {
        private double latitude;
        private double longitude;
        private int altitude;

        private FlightRecordSummaryDto(double latitude, double longitude, int altitude) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.altitude = altitude;
        }

        public static FlightRecordSummaryDto fromFlightRecordEntity(FlightRecordEntity flightRecordEntity) {
            return new FlightRecordSummaryDto(
                    flightRecordEntity.getLatitude(),
                    flightRecordEntity.getLongitude(),
                    flightRecordEntity.getAltitude());
        }
}
