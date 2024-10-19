package com.example.backend.unit.domain.drone.filtering.filters;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.domain.drone.filtering.DroneNumberFilter;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class DroneNumberFiltersTests {
    @ParameterizedTest
    @ValueSource(strings = {"Equals", "GreaterThan", "LesserThan"})
    public void ShouldCreateNumberFilter(String comparisonType){
        var result = new DroneNumberFilter("attribute", 50, Enum.valueOf(ComparisonType.class, comparisonType));
    }
}
