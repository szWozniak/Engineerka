package com.example.backend.event.events.recordRegistration.commands;

import com.example.backend.event.architecture.ICommand;
import com.example.backend.scheduler.model.DroneFromSimulator;

import java.util.List;

public record SaveRecordsCommand(List<DroneFromSimulator> drones) implements ICommand {}
