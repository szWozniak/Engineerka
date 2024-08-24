package com.example.backend.domain.drone.requests.currentlyFlyingDrones;

import com.example.backend.domain.drone.requests.filters.NumberFilterEntry;
import com.example.backend.domain.drone.requests.filters.TextFilterEntry;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

import java.util.List;

public record GetCurrentlyFlyingDronesRequest(
        @NotNull
        @Valid
        List<TextFilterEntry> textFilters,
        @NotNull
        @Valid
        List<NumberFilterEntry> numberFilters){}
