package com.example.backend.domain.drone.filtering.filters;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.filtering.validators.ComparisonTypeForFilterValidator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreatorFactory;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Root;

import java.time.LocalTime;

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

            Join<DroneEntity, FlightRecordEntity> droneWithFlightRecords = root.join("flightRecords");

            //now for time only, then update to date and time
            Subquery<LocalTime> freshestFlightRecordSubquery = query.subquery(LocalTime.class);
            Root<DroneEntity> subRoot = freshestFlightRecordSubquery.from(DroneEntity.class);
            Join<DroneEntity, FlightRecordEntity>  droneWithFlightRecordsForSubquery = subRoot.join("flightRecords");

            Path<LocalTime> flightRecordTimeField = droneWithFlightRecordsForSubquery.get("time");
            freshestFlightRecordSubquery.select(
                    builder.greatest(flightRecordTimeField)
                    ).where(builder.equal(subRoot, root));

            PredicateCreator<Integer> predicateCreator = PredicateCreatorFactory.create(builder, comparisonType);

            return builder.and(
                    builder.equal(droneWithFlightRecords.get("time"), freshestFlightRecordSubquery),
                    predicateCreator.apply(droneWithFlightRecords.get(attributeName), value)
            );
        };
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }
}