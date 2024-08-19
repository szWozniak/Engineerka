package com.example.backend.domain.flightRecord;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;

@SpringBootTest
@DataJpaTest
public class FlightRecordServiceTests {
    @Autowired
    private FlightRecordRepository flightRecordRepository;
    @Autowired
    private TestEntityManager fakeDb;
    private FlightRecordService sut;

    @BeforeEach
    public void setUp(){
        sut = new FlightRecordService(flightRecordRepository);
    }

    @Test
    public void ShouldReturnTrue_IfRecordAlreadyRegistered(){
        var flightRecord = FlightRecordEntityFixture.GetFlightRecordEntityFrom(
                "dupa",
                LocalDate.now(),
                LocalTime.now()
        );

        flightRecord.setFilename("yo");

        fakeDb.persistAndFlush(flightRecord);

        var result = sut.isRecordRegister("yo");

        Assertions.assertTrue(result);
    }

    @Test
    public void ShouldReturnFalse_IfRecordNotRegister(){
        var flightRecord = FlightRecordEntityFixture.GetFlightRecordEntityFrom(
                "dupa",
                LocalDate.now(),
                LocalTime.now()
        );

        flightRecord.setFilename("yo");

        fakeDb.persistAndFlush(flightRecord);

        var result = sut.isRecordRegister("totallyNotyo");

        Assertions.assertFalse(result);
    }
}
