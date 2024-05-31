package com.example.backend.event.command;

import com.example.backend.event.ICommand;
import com.example.backend.drone.model.DroneToRegister;
import com.example.backend.scheduler.model.DroneReadmodel;

import java.util.List;

public record SaveRecordsCommand(List<DroneReadmodel> drones) implements ICommand {}
