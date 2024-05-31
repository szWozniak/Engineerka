package com.example.backend.position;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<PositionEntity, String> {
    public Optional<PositionEntity> findFirstByFilename(String filename);
}
