package com.example.backend.event.command;

import com.example.backend.event.ICommand;
import com.example.backend.scheduler.model.DroneFromSimulator;

import java.util.List;

public record SaveRecordsCommand(List<DroneFromSimulator> drones) implements ICommand {}
