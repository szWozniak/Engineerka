package com.example.backend.domain.flight.filtering;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.common.filtering.ComparisonTypeForFilterValidator;
import com.example.backend.common.filtering.FilterType;
import com.example.backend.common.filtering.infrastructure.PredicateCreator;
import com.example.backend.common.filtering.infrastructure.PredicateCreatorFactory;
import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flight.FlightEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class FlightNumberFilter implements IFlightFilter{
    private static final FilterType FILTER_TYPE = FilterType.Number;
    private final String attributeName;
    private final int value;
    private final ComparisonType comparisonType;

    public FlightNumberFilter(String attributeName, int value, ComparisonType comparisonType) {
        validateComparisionType(comparisonType);
        this.attributeName = attributeName;
        this.value = value;
        this.comparisonType = comparisonType;
    }

    @Override
    public Specification<FlightEntity> toSpecification() {
        return (Root<FlightEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            PredicateCreator<Integer> predicateCreator = PredicateCreatorFactory.create(builder, comparisonType);
            return predicateCreator.apply(root.get(attributeName), value);
        };
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }
}
