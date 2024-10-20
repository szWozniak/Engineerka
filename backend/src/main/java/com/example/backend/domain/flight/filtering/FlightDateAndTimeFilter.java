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

import java.time.LocalDate;
import java.time.LocalTime;

public class FlightDateAndTimeFilter implements IFlightFilter{
    private static final FilterType FILTER_TYPE = FilterType.DateAndTime;
    private final String attributeName;
    private final String value;
    private final ComparisonType comparisonType;

    public FlightDateAndTimeFilter(String attributeName, String value, ComparisonType comparisonType) {
        validateComparisionType(comparisonType);
        this.attributeName = attributeName;
        this.value = value;
        this.comparisonType = comparisonType;
    }

    @Override
    public Specification<FlightEntity> toSpecification(){
        return (Root<FlightEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            var dateAndTime = splitIntoDateAndTime();
            PredicateCreator<LocalDate> datePredicateCreator = PredicateCreatorFactory.create(builder, comparisonType);
            PredicateCreator<LocalTime> timePredicateCreator = PredicateCreatorFactory.create(builder, comparisonType);

            return builder.and(
                    datePredicateCreator.apply(root.get(attributeName+"Date"), dateAndTime.date),
                    timePredicateCreator.apply(root.get(attributeName+"Time"), dateAndTime.time)
            );
        };
    }

    private DateAndTimeTupple splitIntoDateAndTime(){
        var dateAndTime = this.value.split("T");

        return new DateAndTimeTupple(LocalDate.parse(dateAndTime[0]), LocalTime.parse(dateAndTime[1]));
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }

    private record DateAndTimeTupple(LocalDate date, LocalTime time){}
}
