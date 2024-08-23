package com.example.backend.domain.drone.requests.currentlyFlyingDrones;

import com.example.backend.domain.drone.requests.filters.NumberFilterEntry;
import com.example.backend.domain.drone.requests.filters.TextFilterEntry;

import java.util.List;

public record GetCurrentlyFlyingDronesRequest(List<TextFilterEntry> textFilters,
                                              List<NumberFilterEntry> numberFilters){}
