package com.example.backend.simulatorIntegration.events.recordRegistration.commands;

import com.example.backend.simulatorIntegration.architecture.ICommand;
import com.example.backend.listener.model.DroneFromSimulator;

import java.util.List;

public record SaveRecordsCommand(List<DroneFromSimulator> drones) implements ICommand {}
