package com.example.backend.simulatorIntegration.events.recordRegistration.model.envelope;

import lombok.Getter;

public class Heading {
    @Getter
    private int value;

    public Heading(int value) throws IllegalArgumentException{
        if (value < 0 || value > 360) throw new IllegalArgumentException("Heading value must fit between 0-360");
        this.value = value;
    }
}
