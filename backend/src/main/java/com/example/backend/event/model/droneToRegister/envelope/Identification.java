package com.example.backend.event.model.droneToRegister.envelope;

import lombok.Getter;

public class Identification {
    @Getter
    private int value;

    public Identification(int value) throws IllegalArgumentException{
        if (value < 0 || value > 16) throw new IllegalArgumentException("Not acceptable value for Identification");
        this.value = value;
    }
}
