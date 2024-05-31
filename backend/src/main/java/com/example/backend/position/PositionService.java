package com.example.backend.position;

import com.example.backend.position.model.PositionToRegister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionService {
    private final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public boolean isRecordRegister(String filename){
        var record = positionRepository.findFirstByFilename(filename);
        return record.isPresent();
    }

    public void updatePositions(List<PositionEntity> positions){
        positionRepository.saveAll(positions);
    }
}
