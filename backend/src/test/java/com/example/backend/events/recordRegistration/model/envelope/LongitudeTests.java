package com.example.backend.events.recordRegistration.model.envelope;

import com.example.backend.events.recordRegistration.model.envelope.Longitude;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LongitudeTests {

    @Test
    public void ShouldReturnCorrectLongitude_GivenCorrectArgument(){
        var result = new Longitude("213769E");
        Assertions.assertEquals(result.getValue(), 2137.42); //to check
    }

    @ParameterizedTest
    @ValueSource(strings = {"12343E", "123123123E"})
    public void ShouldThrowIllegalArgumentException_GivenArgumentOfLenghtOtherThanSeven(String longitude){
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> new Longitude(longitude)
                ,"longitude length must be 7 characters");
    }

    @Test
    public void ShouldThrowNumberFormatException_WhenFirstPartIsNotFullOfDigits(){
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> new Longitude("XDDDDDN"));
    }

    @Test
    public void ShouldThrowIllegalArgumentException_WhenDirectionIsNotEorW(){
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> new Longitude("123123N")
                ,"longitude should end with E or W character");
    }
}
