package com.example.backend.unit.domain.flightRecord;

import com.example.backend.domain.flightRecord.FlightRecordEntity;

import java.time.LocalDate;
import java.time.LocalTime;

public class FlightRecordEntityFixture {
    public static FlightRecordEntity getFlightRecordEntityFrom(String id,
                                                               LocalDate date,
                                                               LocalTime time){
        return new FlightRecordEntity(
                id,
                "filename",
                "server",
                date,
                time,
                "UPD",
                "systemId",
                69.69,
                69.69,
                69,
                123,
                69,
                69
        );
    }
}
