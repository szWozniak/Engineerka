package com.example.backend.domain.drone;

import com.example.backend.domain.flightRecord.FlightRecordEntityFixture;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class RecordTimestampsComparatorTests {
    private RecordTimestampsComparator sut;

    @BeforeEach
    public void setUp(){
        sut = new RecordTimestampsComparator();
    }

    @Test
    public void ShouldSortFlightRecordEntities_BasedOnDate_AndIfEqualBasedOnTime(){
        var flightOne = FlightRecordEntityFixture.GetFlightRecordEntityFrom("3",
                LocalDate.of(2012, 2, 2),
                LocalTime.of(5, 5, 5, 5));
        var flightTwo = FlightRecordEntityFixture.GetFlightRecordEntityFrom("1",
                LocalDate.of(2024, 2, 2),
                LocalTime.of(3, 3, 3, 3));
        var flightThree = FlightRecordEntityFixture.GetFlightRecordEntityFrom("2",
                LocalDate.of(2012, 2, 2),
                LocalTime.of(7, 7, 7, 7));
        var listToSort = List.of(flightOne, flightTwo, flightThree);

        var result = listToSort.stream().sorted(sut).toList();

        Assertions.assertEquals(result.get(0), flightTwo);
        Assertions.assertEquals(result.get(1), flightThree);
        Assertions.assertEquals(result.get(2), flightOne);
    }
}
