package com.example.backend.domain.drone.filtering;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.common.filtering.FilterType;
import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.common.filtering.ComparisonTypeForFilterValidator;
import com.example.backend.common.filtering.infrastructure.PredicateCreator;
import com.example.backend.common.filtering.infrastructure.PredicateCreatorFactory;
import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Root;

import java.time.LocalDate;
import java.time.LocalTime;

public class DroneNumberFilter implements IDroneFilter {
    private static final FilterType FILTER_TYPE = FilterType.Number;
    private final String attributeName;
    private final double value;
    private final ComparisonType comparisonType;

    public DroneNumberFilter(String attributeName, double value, ComparisonType comparisonType) {
        validateComparisionType(comparisonType);
        this.attributeName = attributeName;
        this.value = value;
        this.comparisonType = comparisonType;
    }

    //WARNING
    //There is silent agreement that number fields are applied ONLY to flightRecords
    //If it for any reason is applied for DroneEntity, then this class nededs to be changed
    @Override
    public Specification<DroneEntity> toSpecification() {
        return (Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            Join<DroneEntity, FlightRecordEntity> droneWithFlightRecords = root.join("flightRecords");

            Subquery<LocalDate> dateSubquery = createDateSubquery(root, query, builder);
            Subquery<LocalTime> timeSubquery = createTimeSubquery(root, query, builder, dateSubquery);

            PredicateCreator<Double> predicateCreator = PredicateCreatorFactory.create(builder, comparisonType);

            Path<LocalTime> timePath =  droneWithFlightRecords.get("time");
            Path<LocalDate> datePath = droneWithFlightRecords.get("date");

            return builder.and(
                    builder.equal(datePath, dateSubquery),
                    builder.equal(timePath, timeSubquery),
                    predicateCreator.apply(droneWithFlightRecords.get(attributeName), value)
            );
        };
    }

    private Subquery<LocalDate> createDateSubquery(Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        Subquery<LocalDate> dateSubquery = query.subquery(LocalDate.class);
        Root<FlightRecordEntity> flightRecordRoot = dateSubquery.from(FlightRecordEntity.class);

        Path<DroneEntity> dronePath = flightRecordRoot.get("drone");
        Path<LocalDate> datePath = flightRecordRoot.get("date");

        dateSubquery.select(builder.greatest(datePath))
                .where(builder.equal(dronePath, root));

        return dateSubquery;
    }

    private Subquery<LocalTime> createTimeSubquery(Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder, Subquery<LocalDate> dateSubquery) {
        Subquery<LocalTime> timeSubquery = query.subquery(LocalTime.class);
        Root<FlightRecordEntity> flightRecordRoot = timeSubquery.from(FlightRecordEntity.class);

        Path<LocalTime> timePath =  flightRecordRoot.get("time");
        Path<DroneEntity> dronePath = flightRecordRoot.get("drone");
        Path<LocalDate> datePath = flightRecordRoot.get("date");

        timeSubquery.select(builder.greatest(timePath))
                .where(
                        builder.equal(dronePath, root),
                        builder.equal(datePath, dateSubquery)
                );

        return timeSubquery;
    }

    private void validateComparisionType(ComparisonType comparisonType) throws IllegalArgumentException{
        if(!ComparisonTypeForFilterValidator.isValid(comparisonType, FILTER_TYPE)){
            throw new IllegalArgumentException(comparisonType + "Comparision is not legal for " + FILTER_TYPE + " filter");
        }
    }
}