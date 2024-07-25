package com.example.backend.event.model.registration.envelope;

import lombok.Getter;

public class Identification {
    @Getter
    private int value;

    public Identification(int value) throws IllegalArgumentException{
        if (value < 1 || value > 16) throw new IllegalArgumentException("Not acceptable value for Identification");
        this.value = value;
    }
}
