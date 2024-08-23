package com.example.backend.domain.drone.filters;

import com.example.backend.domain.drone.DroneEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Root;

public class TextFilter implements IDroneFilter{
    private final String attributeName;
    private final String value;
    private final ComparisionType comparisionType;

    public TextFilter(String attributeName, String value, ComparisionType comparisionType) {
        this.attributeName = attributeName;
        this.value = value;
        this.comparisionType = comparisionType;
    }


    @Override
    public Specification<DroneEntity> toSpecification() {
        return (Root<DroneEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
            PredicateCreator<String> predicateCreator = PredicateCreatorFactory.create(builder, comparisionType);
            return predicateCreator.apply(root.get(attributeName), value);
        };
    }
}
