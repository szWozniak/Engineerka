package com.example.backend.unit.domain.drone.filtering.filters;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.TextFilter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.data.jpa.domain.Specification;

import java.util.function.Predicate;

public class TextFiltersTests {

    @ParameterizedTest
    @ValueSource(strings = {"Equals"})
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


    @Test
    public void test(){
        Predicate<String> predicate = Predicate.isEqual("johnny");

        var sut = new TextFilter("attribute", "johnny", ComparisonType.Equals);
        var result = sut.toSpecification();
    }
}
