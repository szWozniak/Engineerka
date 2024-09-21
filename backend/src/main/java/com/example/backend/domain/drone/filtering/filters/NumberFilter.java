package com.example.backend.domain.drone.filtering.filters;

import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.drone.filtering.validators.ComparisonTypeForFilterValidator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreator;
import com.example.backend.domain.drone.filtering.infrastructure.PredicateCreatorFactory;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Root;

import java.time.LocalDate;
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


            Subquery<LocalTime> subQuery = createQueryToGetMostFreshFlightRecord(root, query, builder);

            PredicateCreator<Integer> predicateCreator = PredicateCreatorFactory.create(builder, comparisonType);

            return builder.and(
                    builder.equal(droneWithFlightRecords.get("time"), subQuery),
                    predicateCreator.apply(droneWithFlightRecords.get(attributeName), value)
            );
        };
    }

    private Subquery<LocalTime> createQueryToGetMostFreshFlightRecord(Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder){
        Subquery<LocalDate> freshestDateSubquery = query.subquery(LocalDate.class);
        Root<DroneEntity> subRoot = freshestDateSubquery.from(DroneEntity.class);
        Join<DroneEntity, FlightRecordEntity> droneWithFlightRecordsForDate = subRoot.join("flightRecords");

        Path<LocalDate> flightRecordDateField = droneWithFlightRecordsForDate.get("date");

        // Find the maximum date for the current DroneEntity
        freshestDateSubquery.select(builder.greatest(flightRecordDateField))
                .where(builder.equal(subRoot, root));

        Subquery<LocalTime> freshestRecordSubQuery = query.subquery(LocalTime.class);
        Root<DroneEntity> timeSubRoot = freshestRecordSubQuery.from(DroneEntity.class);
        Join<DroneEntity, FlightRecordEntity> droneWithFlightRecordsForTime = timeSubRoot.join("flightRecords");

        Path<LocalTime> flightRecordTimeField = droneWithFlightRecordsForTime.get("time");

        freshestRecordSubQuery.select(builder.greatest(flightRecordTimeField))
                .where(
                        builder.and(
                                builder.equal(timeSubRoot, root),
                                builder.equal(droneWithFlightRecordsForTime.get("date"), freshestDateSubquery)
                        )
                );

        return freshestRecordSubQuery;
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }
}