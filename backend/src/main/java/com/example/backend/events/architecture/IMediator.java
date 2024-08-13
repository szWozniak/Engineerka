package com.example.backend.events.architecture;

public interface IMediator {
    public void  send(ICommand command);
}
