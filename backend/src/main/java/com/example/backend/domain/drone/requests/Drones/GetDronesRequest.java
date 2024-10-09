package com.example.backend.domain.drone.requests.Drones;

import com.example.backend.domain.drone.requests.filters.NumberFilterEntry;
import com.example.backend.domain.drone.requests.filters.TextFilterEntry;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record GetDronesRequest(
        @NotNull
        @Valid
        List<TextFilterEntry> textFilters,
        @NotNull
        @Valid
        List<NumberFilterEntry> numberFilters
){}