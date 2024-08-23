package com.example.backend.domain.drone.filters;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;

@FunctionalInterface
public interface PredicateCreator<TValue> {
    Predicate apply(Path<TValue> attributeName, TValue value);
}
