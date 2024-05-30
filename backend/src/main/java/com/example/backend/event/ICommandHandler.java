package com.example.backend.event;

public interface ICommandHandler <T extends ICommand>{
    public void handle(T command);
}
