package com.example.backend.domain.drone.filtering.infrastructure;

import com.example.backend.domain.drone.filtering.filters.ComparisonType;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;

public class PredicateCreatorFactory {
    public static <TValue extends Comparable<? super TValue>> PredicateCreator<TValue> create(CriteriaBuilder builder, ComparisonType type){
        return switch (type){
            case Equals -> builder::equal;
            case GreaterThan -> builder::greaterThan;
            case LesserThan -> builder::lessThan;
            case Contains -> (path, value) -> {
                if (value instanceof String){
                    return builder.like((Path<String>) path, "%" + value + "%");
                }
                throw new IllegalArgumentException("Contains can only be applied to string value");
            };
        };
    }
}
