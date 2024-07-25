package com.example.backend.event.architecture;

public interface ICommandHandler <T extends ICommand>{
    public void handle(T command);
}
