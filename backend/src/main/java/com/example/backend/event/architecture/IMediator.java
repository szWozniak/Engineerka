package com.example.backend.event.architecture;

public interface IMediator {
    public void  send(ICommand command);
}
