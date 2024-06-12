package com.example.backend.event.model.registration.envelope;

import lombok.Getter;

public class Longitude {
    @Getter
    private double value;

    public Longitude(String value) throws IllegalArgumentException{
        var numericPart = value.substring(0, value.length()-1);
        var parsedNumericPart = parseLongitude(numericPart);
        this.value = adjustCoordinate(parsedNumericPart, value.charAt(value.length() - 1));
    }

    private double parseLongitude(String longitude){
        if (longitude.length() != 7) throw new IllegalArgumentException("longitude length must be 7 characters");
        var builder = new StringBuilder(longitude);
        var preparedLongitude = builder.insert(3, '.').toString();
        return Double.parseDouble(preparedLongitude);
    }

    private double adjustCoordinate(double coordinate, char direction){
        return switch (direction){
            case 'E' -> coordinate;
            case 'W' -> coordinate*-1;
            default -> throw new IllegalArgumentException("longitude should end with E or W character");
        };
    }
}
