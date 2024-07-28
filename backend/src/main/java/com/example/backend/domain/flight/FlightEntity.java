package com.example.backend.domain.flight;

import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class FlightEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Getter
    @Setter
    private Long Id;

    @OneToMany
    @Getter
    @Setter
    private List<FlightRecordEntity> flightRecords;

}
