package com.example.backend.domain.drone.filtering.filters;

import jakarta.persistence.criteria.Subquery;

import java.time.LocalDate;
import java.time.LocalTime;

public record MostFreshFlightRecordSubquery(Subquery<LocalDate> dateQuery, Subquery<LocalTime> timeQuery) {
}
