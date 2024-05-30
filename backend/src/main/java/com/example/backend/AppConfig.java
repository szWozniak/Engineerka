package com.example.backend;

import com.example.backend.scheduler.configuration.SharedFolderConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public SharedFolderConfig sharedFolderConfig(){
        return new SharedFolderConfig();
    }
}
