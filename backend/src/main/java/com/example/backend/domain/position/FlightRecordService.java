package com.example.backend.domain.position;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightRecordService {
    private final FlightRecordRepository flightRecordRepository;

    public FlightRecordService(FlightRecordRepository flightRecordRepository) {
        this.flightRecordRepository = flightRecordRepository;
    }

    public boolean isRecordRegister(String filename){
        var record = flightRecordRepository.findFirstByFilename(filename);
        return record.isPresent();
    }

    public void updatePositions(List<FlighRecordEntity> positions){
        flightRecordRepository.saveAll(positions);
    }
}
