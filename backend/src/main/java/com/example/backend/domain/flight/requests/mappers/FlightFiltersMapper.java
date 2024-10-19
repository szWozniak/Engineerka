package com.example.backend.domain.flight.requests.mappers;

import com.example.backend.common.filtering.ComparisonType;
import com.example.backend.common.filtering.dtos.NumberFilterEntry;
import com.example.backend.common.filtering.dtos.TextFilterEntry;
import com.example.backend.domain.flight.filtering.FlightNumberFilter;
import com.example.backend.domain.flight.filtering.FlightTextFilter;
import com.example.backend.domain.flight.filtering.IFlightFilter;

import java.util.ArrayList;
import java.util.List;

public class FlightFiltersMapper {
    public static List<IFlightFilter> map(List<TextFilterEntry> textFilters, List<NumberFilterEntry> numberFilters) throws IllegalArgumentException{
        List<IFlightFilter> result = new ArrayList<>();

        result.addAll(textFilters.stream().map(filter -> new FlightTextFilter(
                filter.parameter(), filter.value(), Enum.valueOf(ComparisonType.class, filter.comparisonType())
        )).toList());

        result.addAll(numberFilters.stream().map(filter -> new FlightNumberFilter(
                filter.parameter(), filter.value(), Enum.valueOf(ComparisonType.class, filter.comparisonType())
        )).toList());

        return result;
    }
}
