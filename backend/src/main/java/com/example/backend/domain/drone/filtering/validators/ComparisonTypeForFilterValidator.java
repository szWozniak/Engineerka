package com.example.backend.domain.drone.filtering.validators;

import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import com.example.backend.domain.drone.filtering.filters.FilterType;

import java.util.List;

public class ComparisonTypeForFilterValidator {
    private static final List<ComparisonType> LEGAL_TEXT_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals);
    private static final List<ComparisonType> LEGAL_NUMBER_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals, ComparisonType.GreaterThan, ComparisonType.LesserThan);
    public static boolean isValid(ComparisonType comparisonType, FilterType filterType) {
        return switch(filterType){
            case Text -> LEGAL_TEXT_FILTER_COMPARISON_TYPES.contains(comparisonType);
            case Number -> LEGAL_NUMBER_FILTER_COMPARISON_TYPES.contains(comparisonType);
        };
    }
}
