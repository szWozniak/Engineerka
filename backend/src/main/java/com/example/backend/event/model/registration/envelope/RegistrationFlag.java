package com.example.backend.event.model.registration.envelope;

public enum RegistrationFlag {
    BEG,
    UPD,
    DROP,
    EXT;

    public static boolean MapToAirbourne(RegistrationFlag flag){
        return switch (flag){
            case BEG, UPD, EXT -> true;
            case DROP  -> false;
        };
    }
}
