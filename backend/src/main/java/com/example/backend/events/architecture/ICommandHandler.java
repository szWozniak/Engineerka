package com.example.backend.events.architecture;

public interface ICommandHandler <T extends ICommand>{
    public void handle(T command);
}
