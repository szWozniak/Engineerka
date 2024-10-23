package com.example.backend.domain.flight.filtering;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.common.filtering.ComparisonTypeForFilterValidator;
import com.example.backend.common.filtering.FilterType;
import com.example.backend.common.filtering.infrastructure.PredicateCreator;
import com.example.backend.common.filtering.infrastructure.PredicateCreatorFactory;
import com.example.backend.domain.flight.FlightEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class FlightTimeFilter implements IFlightFilter{
    private static final FilterType FILTER_TYPE = FilterType.Time;
    private final String attributeName;
    private final String value;
    private final ComparisonType comparisonType;

    public FlightTimeFilter(String attributeName, String value, ComparisonType comparisonType) {
        validateComparisionType(comparisonType);
        this.attributeName = attributeName;
        this.value = value;
        this.comparisonType = comparisonType;
    }

    @Override
    public Specification<FlightEntity> toSpecification() {
        return (Root<FlightEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            PredicateCreator<LocalTime> predicateCreator = PredicateCreatorFactory.create(builder, comparisonType);
            return predicateCreator.apply(root.get(attributeName), prepareTimeAttribute());
        };
    }

    private LocalTime prepareTimeAttribute(){
        return LocalTime.parse("00:" + value);
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }
}
