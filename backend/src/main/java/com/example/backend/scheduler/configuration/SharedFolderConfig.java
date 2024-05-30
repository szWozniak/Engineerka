package com.example.backend.scheduler.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("sharedfolder")
public class SharedFolderConfig {

    @Getter
    @Setter
    private String path;

    @Getter
    @Setter
    private long interval;
}
