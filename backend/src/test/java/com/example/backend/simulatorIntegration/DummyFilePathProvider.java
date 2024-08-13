package com.example.backend.simulatorIntegration;

import java.net.URL;
import java.nio.file.Paths;

public class DummyFilePathProvider {
    public String getPath(){
        ClassLoader loader = getClass().getClassLoader();
        URL resource = loader.getResource("dane.csv");
        return Paths.get(resource.getPath()).toString();
    }
}
