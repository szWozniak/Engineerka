package com.example.backend.simulatorIntegration;

import java.net.URL;

public class DummyFilePathProvider {
    public String getPath(){
        ClassLoader loader = getClass().getClassLoader();
        URL resource = loader.getResource("droneFromSimulator.csv");
        return resource.getPath();
    }
}
