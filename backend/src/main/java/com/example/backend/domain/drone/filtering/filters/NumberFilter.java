package com.example.backend.domain.drone.filtering.filters;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.filtering.validators.ComparisonTypeForFilterValidator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreatorFactory;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Root;

public class NumberFilter implements IDroneFilter {
    private static final FilterType FILTER_TYPE = FilterType.Number;
    private final String attributeName;
    private final int value;
    private final ComparisonType comparisonType;

    public NumberFilter(String attributeName, int value, ComparisonType comparisonType) {
        validateComparisionType(comparisonType);
        this.attributeName = attributeName;
        this.value = value;
        this.comparisonType = comparisonType;
    }

    @Override
    public Specification<DroneEntity> toSpecification() {
        return (Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
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