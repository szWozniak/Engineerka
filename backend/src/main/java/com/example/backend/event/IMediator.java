package com.example.backend.event;

public interface IMediator {
    public <T extends ICommand>void  send(T command);
}
