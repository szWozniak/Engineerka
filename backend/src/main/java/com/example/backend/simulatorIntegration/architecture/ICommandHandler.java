package com.example.backend.simulatorIntegration.architecture;

public interface ICommandHandler <T extends ICommand>{
    public void handle(T command);
}
