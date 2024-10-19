package com.example.backend.common.filtering;

import java.util.List;

public class ComparisonTypeForFilterValidator {
    private static final List<ComparisonType> LEGAL_TEXT_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals, ComparisonType.Contains, ComparisonType.GreaterThan, ComparisonType.LesserThan);
    private static final List<ComparisonType> LEGAL_NUMBER_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals, ComparisonType.GreaterThan, ComparisonType.LesserThan);
    public static boolean isValid(ComparisonType comparisonType, FilterType filterType) {
        return switch(filterType){
            case Text -> LEGAL_TEXT_FILTER_COMPARISON_TYPES.contains(comparisonType);
            case Number -> LEGAL_NUMBER_FILTER_COMPARISON_TYPES.contains(comparisonType);
        };
    }
}
