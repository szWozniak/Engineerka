package com.example.backend.domain.drone.requests.filters;

import jakarta.validation.constraints.NotNull;

public record NumberFilterEntry(
        @NotNull(message = "filter parameter cannot be null")
        String parameter,

        String key,
        @NotNull(message = "filter value cannot be null")
        int value,

        @NotNull(message = "filter comparison type cannot be null")
        String comparisonType
){}