package com.example.backend.simulatorIntegration.infrastructure;

import com.example.backend.simulatorIntegration.SimulatorIntegrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RabbitMQListener {
    private final SimulatorIntegrationService service;

    public RabbitMQListener(SimulatorIntegrationService service){
        this.service = service;
    }

    @RabbitListener(queues = {"fileQueue"})
    public void onFileCreation(String filename){
        log.info("Received file creation: " + filename);
        service.ProcessIncomingFile(filename);
    }

}
