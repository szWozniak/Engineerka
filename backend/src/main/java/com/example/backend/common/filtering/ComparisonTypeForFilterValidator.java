package com.example.backend.common.filtering;

import java.util.List;

public class ComparisonTypeForFilterValidator {
    private static final List<ComparisonType> LEGAL_TEXT_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals, ComparisonType.Contains, ComparisonType.GreaterThanOrEqual, ComparisonType.LesserThanOrEqual);
    private static final List<ComparisonType> LEGAL_NUMBER_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals, ComparisonType.GreaterThanOrEqual, ComparisonType.LesserThanOrEqual);
    private static final List<ComparisonType> LEGAL_DATEANDTIME_FILTER_COMPARISON_TYPES = List.of(ComparisonType.GreaterThanOrEqual, ComparisonType.LesserThanOrEqual);
    private static final List<ComparisonType> LEGAL_BOOLEAN_FILTER_COMPARISON_TYPES = List.of(ComparisonType.Equals);

    public static boolean isValid(ComparisonType comparisonType, FilterType filterType) {
        return switch(filterType){
            case Text -> LEGAL_TEXT_FILTER_COMPARISON_TYPES.contains(comparisonType);
            case Number -> LEGAL_NUMBER_FILTER_COMPARISON_TYPES.contains(comparisonType);
            case Boolean -> LEGAL_BOOLEAN_FILTER_COMPARISON_TYPES.contains(comparisonType);
            case DateAndTime -> LEGAL_DATEANDTIME_FILTER_COMPARISON_TYPES.contains(comparisonType);
        };
    }
}
