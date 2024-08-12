package com.example.backend.simulatorIntegration.events.recordRegistration.model.envelope;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class IdentificationTests {

    @Test
    public void ShouldReturnIdentification_GivenValueBetweenOneAndSixteen(){
        var result = new Identification(5);
        Assertions.assertEquals(result.getValue(), 5);
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 17})
    public void ShouldThrowIllegalArgumentException_GivenValueAboveSixteenOrBelowOne(int value){
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> new Identification(value),
                "Not acceptable value for Identification");
    }
}
