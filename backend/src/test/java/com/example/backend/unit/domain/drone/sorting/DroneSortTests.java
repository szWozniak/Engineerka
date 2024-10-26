package com.example.backend.unit.domain.drone.sorting;

import com.example.backend.common.sorting.OrderType;
import com.example.backend.domain.drone.sorting.DroneSort;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class DroneSortTests {
    @ParameterizedTest
    @ValueSource(strings = {"ASC", "DESC"})
    public void ShouldCreateSort(String orderType){
        var result = new DroneSort("attribute", Enum.valueOf(OrderType.class, orderType));
    }
}
