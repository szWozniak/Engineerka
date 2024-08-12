package com.example.backend.simulatorIntegration.events.recordRegistration.model.envelope;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.Stream;

@SpringBootTest
public class RegistrationFlagTests {

    @ParameterizedTest
    @MethodSource("provideAirbourneEnums")
    public void mapToIsAirbourneShouldReturnTrue_WhenGivenOtherFlagThanDrop(RegistrationFlag flag){
        boolean result = RegistrationFlag.MapToAirbourne(flag);
        Assertions.assertTrue(result);
    }

    @Test
    public void mapToIsAirbourneShouldReturnFalse_WhenGivenRegistrationFlagOfDrop(){
        boolean result = RegistrationFlag.MapToAirbourne(RegistrationFlag.DROP);
        Assertions.assertFalse(result);
    }

    static Stream<Arguments> provideAirbourneEnums(){
        return Stream.of(
                Arguments.of(RegistrationFlag.BEG),
                Arguments.of(RegistrationFlag.UPD),
                Arguments.of(RegistrationFlag.EXT)
        );
    }
}
