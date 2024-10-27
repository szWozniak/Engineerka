package com.example.backend.domain.flight.requests.mappers;

import com.example.backend.common.sorting.OrderType;
import com.example.backend.common.sorting.dtos.SortEntry;
import com.example.backend.domain.flight.sorting.FlightSort;
import com.example.backend.domain.flight.sorting.IFlightSort;

import java.util.Optional;

public class FlightSortMapper {
    public static Optional<IFlightSort> map(SortEntry sort){
        return sort != null ? Optional.of(new FlightSort(sort.parameter(), Enum.valueOf(OrderType.class, sort.orderType()))) : Optional.empty();
    }
}
