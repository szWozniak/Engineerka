import { z } from "zod";
import { dronePositionSchema } from "../drones/types";

export const FlightRecordSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number(),
  heading: z.number(),
  speed: z.number(),
  fuel: z.number()
})
  
export type FlightRecord = z.infer<typeof FlightRecordSchema>;

export const DroneFlightSchema = z.object({
  id: z.number(),
  flightRecords: FlightRecordSchema.array()
})
  
export type DroneFlight = z.infer<typeof DroneFlightSchema>;

export const DroneFlightSummarySchema = z.object({
  id: z.number(),
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
  duration: z.string(),
  averageSpeed: z.number(),
  elevationGain: z.number(),
  distance: z.number(),
  didLanded: z.boolean(),
  flightRecords: dronePositionSchema.array()
})

export type DroneFlightSummary = z.infer<typeof DroneFlightSummarySchema>;