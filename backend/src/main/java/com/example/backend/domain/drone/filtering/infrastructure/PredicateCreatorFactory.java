package com.example.backend.domain.drone.filtering.infrastructure;

import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import jakarta.persistence.criteria.CriteriaBuilder;

public class PredicateCreatorFactory {
    public static <TValue extends Comparable<? super TValue>> PredicateCreator<TValue> create(CriteriaBuilder builder, ComparisonType type){
        return switch (type){
            case Equal -> builder::equal;
            case GreaterThan -> builder::greaterThan;
            case LesserThan -> builder::lessThan;
        };
    }
}
