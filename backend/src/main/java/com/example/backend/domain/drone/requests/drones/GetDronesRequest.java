package com.example.backend.domain.drone.requests.drones;

import com.example.backend.common.filtering.dtos.NumberFilterEntry;
import com.example.backend.common.filtering.dtos.TextFilterEntry;
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