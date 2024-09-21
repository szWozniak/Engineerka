import { Color } from "deck.gl"
import { z } from "zod"
const dronePositionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number()
})

export type dronePosition = z.infer<typeof dronePositionSchema>;

export const DroneBaseSchema = z.object({
  registrationNumber: z.string(),
  country: z.string(),
  operator: z.string(),
  identification: z.number().min(1).max(16),
  model: z.string(),
  sign: z.string(),
  type: z.string(),
})

export const DroneSchema = DroneBaseSchema.merge(
  z.object({
    heading: z.number(),
    speed: z.number(),
    fuel: z.number(),
    currentPosition: dronePositionSchema,
    trace: dronePositionSchema.array()
  })
)

export type DroneBase = z.infer<typeof DroneBaseSchema>
export type Drone = z.infer<typeof DroneSchema>;

export const FlightRecordPositionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number(),
  date: z.string(),
  time: z.string(),
  heading: z.number(),
  speed: z.number(),
  fuel: z.number()
})

export type flightRecordPosition = z.infer<typeof FlightRecordPositionSchema>;

export const DroneFlightSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
  duration: z.string(),
  averageSpeed: z.number(),
  elevationGain: z.number(),
  distance: z.number(),
  flightRecords: FlightRecordPositionSchema.array()
})

export type DroneFlight = z.infer<typeof DroneFlightSchema>;

export interface MapDrone extends Drone {
  color: Color
}