package com.example.backend.unit.domain.flight.requests.mappers;

import com.example.backend.common.filtering.dtos.NumberFilterEntry;
import com.example.backend.common.filtering.dtos.TextFilterEntry;
import com.example.backend.domain.flight.filtering.FlightNumberFilter;
import com.example.backend.domain.flight.filtering.FlightTextFilter;
import com.example.backend.domain.flight.filtering.IFlightFilter;
import com.example.backend.domain.flight.requests.mappers.FlightFiltersMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.ArrayList;
import java.util.List;

public class FlightFiltersMapperTests {
    @ParameterizedTest
    @ValueSource(strings = {"Equals", "Contains"})
    public void ShouldProperlyMap_TextFilter(){
        var textFilterEntry = new TextFilterEntry("registrationNumber", "whatever", "Johnny", "Equals");

        List<IFlightFilter> result = FlightFiltersMapper.map(List.of(textFilterEntry), new ArrayList<>());

        Assertions.assertEquals(1, result.size());
        var filter = result.get(0);
        Assertions.assertEquals(filter.getClass(), FlightTextFilter.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"GreaterThan", "LesserThan", "ZlyEnum"})
    public void ShouldThrowException_WhenInvalidTextFilter(String comparisonType){
        var textFilterEntry = new TextFilterEntry("registrationNumber", "whatever", "Johnny", comparisonType);

        Executable action = () -> FlightFiltersMapper.map(List.of(textFilterEntry), new ArrayList<>());

        Assertions.assertThrows(IllegalArgumentException.class, action);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Equals", "GreaterThan", "LesserThan"})
    public void ShouldProperlyMap_NumberFilter(String comparisonType){
        var numberFilterEntry = new NumberFilterEntry("registrationNumber", "whatever", 69, comparisonType);

        var result = FlightFiltersMapper.map(new ArrayList<>(), List.of(numberFilterEntry));

        Assertions.assertEquals(1, result.size());
        var filter = result.get(0);
        Assertions.assertEquals(filter.getClass(), FlightNumberFilter.class);
    }



    @ParameterizedTest
    @ValueSource(strings = {"ZlyEnum", "Contains"})
    public void ShouldThrowException_WhenInvalidNumberFilter(String comparisonType){
        var numberFilterEntry = new NumberFilterEntry("registrationNumber", "whatever", 69, comparisonType);

        Executable action = () -> FlightFiltersMapper.map(new ArrayList<>(), List.of(numberFilterEntry));

        Assertions.assertThrows(IllegalArgumentException.class, action);
    }
}
