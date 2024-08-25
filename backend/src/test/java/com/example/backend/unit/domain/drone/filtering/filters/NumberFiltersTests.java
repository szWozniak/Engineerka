package com.example.backend.unit.domain.drone.filtering.filters;

import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.NumberFilter;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class NumberFiltersTests {
    @ParameterizedTest
    @ValueSource(strings = {"Equals", "GreaterThan", "LesserThan"})
    public void ShouldCreateNumberFilter(String comparisonType){
        var result = new NumberFilter("attribute", 50, Enum.valueOf(ComparisonType.class, comparisonType));
    }
}
