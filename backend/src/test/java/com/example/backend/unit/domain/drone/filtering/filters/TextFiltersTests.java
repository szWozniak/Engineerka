package com.example.backend.unit.domain.drone.filtering.filters;

import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.TextFilter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class TextFiltersTests {

    @ParameterizedTest
    @ValueSource(strings = {"Equals", "Contains"})
    public void ShouldCreateTextFilter(String comparisonType){
        var result = new TextFilter("attribute", "johnny", Enum.valueOf(ComparisonType.class, comparisonType));
    }

    @ParameterizedTest
    @ValueSource(strings = {"GreaterThan", "LesserThan"})
    public void ShouldThrowException_WhenInvalidComparisonType(String comparisonType){
        var enumValue = Enum.valueOf(ComparisonType.class, comparisonType);
        Executable action = () -> new TextFilter("attribute", "johnny", enumValue);

        Assertions.assertThrows(IllegalArgumentException.class, action);
    }
}
