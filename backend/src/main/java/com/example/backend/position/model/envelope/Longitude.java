package com.example.backend.position.model.envelope;

import lombok.Getter;

public class Longitude {
    @Getter

    private double value;

    public Longitude(String value) throws IllegalArgumentException{
        var numericPart = value.substring(0, value.length()-1);
        var parsedNumericPart = parseLongitude(numericPart);
        this.value = adjustCoordinate(parsedNumericPart, value.charAt(value.length() - 1));

    }

    private double parseLongitude(String latitude){
        if (latitude.length() != 7) throw new IllegalArgumentException("Latitude lenght must be 6 characters");
        var builder = new StringBuilder(latitude);
        var preparedLatitued = builder.insert(2, '.').toString();
        return Double.parseDouble(preparedLatitued);
    }

    private double adjustCoordinate(double coordinate, char direction){
        return switch (direction){
            case 'E' -> coordinate;
            case 'W' -> coordinate*-1;
            default -> throw new IllegalArgumentException("Latitude should end with N or S character");
        };
    }
}
