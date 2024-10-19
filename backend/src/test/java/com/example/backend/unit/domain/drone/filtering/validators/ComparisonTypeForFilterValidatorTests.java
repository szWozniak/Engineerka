package com.example.backend.unit.domain.drone.filtering.validators;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.common.filtering.FilterType;
import com.example.backend.common.filtering.ComparisonTypeForFilterValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

public class ComparisonTypeForFilterValidatorTests {
    @ParameterizedTest
    @EnumSource(value = ComparisonType.class, names = {"Equals"})
    public void ShouldReturnTrue_ForValidComparisonType_ForTextFilter(ComparisonType type){
        var result = ComparisonTypeForFilterValidator.isValid(type, FilterType.Text);
        Assertions.assertTrue(result);
    }

    @ParameterizedTest
    @EnumSource(value = ComparisonType.class, names = {"GreaterThan", "LesserThan"})
    public void ShouldReturnFalse_ForInvalidComparisonType_ForTextFilter(ComparisonType type){
        var result = ComparisonTypeForFilterValidator.isValid(type, FilterType.Text);
        Assertions.assertFalse(result);
    }

    @ParameterizedTest
    @EnumSource(value = ComparisonType.class, names = {"Equals", "GreaterThan", "LesserThan"})
    public void ShouldReturnTrue_ForValidComparisonType_ForNumberFilter(ComparisonType type){
        var result = ComparisonTypeForFilterValidator.isValid(type, FilterType.Number);
        Assertions.assertTrue(result);
    }
}
