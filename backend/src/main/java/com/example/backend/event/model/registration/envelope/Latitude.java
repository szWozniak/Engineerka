package com.example.backend.event.model.registration.envelope;

import lombok.Getter;

public class Latitude {
    @Getter
    private double value;

    public Latitude(String value) throws IllegalArgumentException{
        var numericPart = value.substring(0, value.length()-1);
        var parsedNumericPart = parseLatitude(numericPart);
        this.value = adjustCoordinate(parsedNumericPart, value.charAt(value.length() - 1));

    }

    private double parseLatitude(String latitude){
        if (latitude.length() != 6) throw new IllegalArgumentException("Latitude lenght must be 6 characters");
        var builder = new StringBuilder(latitude);
        var preparedLatitude = builder.insert(2, '.').toString();
        return Double.parseDouble(preparedLatitude);
    }

    private double adjustCoordinate(double coordinate, char direction){
        return switch (direction){
            case 'N' -> coordinate;
            case 'S' -> coordinate*-1;
            default -> throw new IllegalArgumentException("Latitude should end with N or S character");
        };
    }
}
