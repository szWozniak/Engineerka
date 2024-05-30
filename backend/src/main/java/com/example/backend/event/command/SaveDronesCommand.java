package com.example.backend.event.command;

import com.example.backend.event.ICommand;
import com.example.backend.drone.model.DroneToRegister;

import java.util.List;

public record SaveDronesCommand(List<DroneToRegister> drones) implements ICommand {}
