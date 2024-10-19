package com.example.backend.domain.flight.requests.flightSummaries;

import com.example.backend.common.filtering.infrastructure.SpecificationHelper;
import com.example.backend.domain.drone.DroneEntity;
import com.example.backend.domain.flight.FlightEntity;
import com.example.backend.domain.flight.FlightRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;


public class FlightsQuery {
    private final FlightRepository repository;


    public FlightsQuery(FlightRepository repository) {
        this.repository = repository;
    }

    public List<FlightEntity> execute(String regNumber, List<Specification<FlightEntity>> specifications){
        specifications.add(createDefaultConstraints(regNumber));
        Specification<FlightEntity> combinedSpecifications = SpecificationHelper.combine(specifications);
        return repository.findAll(combinedSpecifications);
    }

    private Specification<FlightEntity> createDefaultConstraints(String regNumber){
        return (Root<FlightEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            // Join FlightEntity with DroneEntity
            Join<FlightEntity, DroneEntity> droneJoin = root.join("droneEntity");

            // Add condition where DroneEntity's regNumber equals the passed regNumber
            return builder.equal(droneJoin.get("registrationNumber"), regNumber);
        };
    }
}
