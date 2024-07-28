package com.example.backend.domain.flight;

import com.example.backend.domain.flightRecord.FlightRecordEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class FlightEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long Id;

    @OneToMany
    private List<FlightRecordEntity> flightRecords;

}
