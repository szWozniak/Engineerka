package com.example.backend.unit.domain.flight.sorting;

import com.example.backend.common.sorting.OrderType;
import com.example.backend.domain.flight.sorting.FlightSort;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class FlightSortTests {
    @ParameterizedTest
    @ValueSource(strings = {"ASC", "DESC"})
    public void ShouldCreateSort(String orderType){
        var result = new FlightSort("attribute", Enum.valueOf(OrderType.class, orderType));
    }
}
