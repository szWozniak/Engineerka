package com.example.backend.unit.domain.drone.filtering;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.domain.drone.filtering.DroneNumberFilter;
import com.example.backend.domain.drone.filtering.DroneTextFilter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class DroneNumberFiltersTests {
    @ParameterizedTest
    @ValueSource(strings = {"Equals", "GreaterThan", "LesserThan"})
    public void ShouldCreateNumberFilter(String comparisonType){
        var result = new DroneNumberFilter("attribute", 50, Enum.valueOf(ComparisonType.class, comparisonType));
    }

    @ParameterizedTest
    @ValueSource(strings = {"contains"})
    public void ShouldThrowException_WhenInvalidComparisonType(String comparisonType){
        var enumValue = Enum.valueOf(ComparisonType.class, comparisonType);
        Executable action = () -> new DroneNumberFilter("attribute", 50, enumValue);

        Assertions.assertThrows(IllegalArgumentException.class, action);
    }
}
