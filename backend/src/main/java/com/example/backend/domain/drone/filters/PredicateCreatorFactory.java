package com.example.backend.domain.drone.filters;

import jakarta.persistence.criteria.CriteriaBuilder;

public class PredicateCreatorFactory {
    public static <TValue extends Comparable<? super TValue>> PredicateCreator<TValue> create(CriteriaBuilder builder, ComparisionType type){
        return switch (type){
            case Equal -> builder::equal;
            case GreaterThan -> builder::greaterThan;
            case LesserThan -> builder::lessThan;
        };
    }
}
