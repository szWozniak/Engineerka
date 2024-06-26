import { Color } from "deck.gl"
import { z } from "zod"
const dronePositionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number()
})

export type dronePosition = z.infer<typeof dronePositionSchema>;

export const DroneSchema = z.object({
  registrationNumber: z.string(),
  country: z.string(),
  operator: z.string(),
  identification: z.number().min(1).max(16),
  model: z.string(),
  sign: z.string(),
  type: z.string(),
  heading: z.number(),
  speed: z.number(),
  fuel: z.number(),
  currentPosition: dronePositionSchema,
  trace: dronePositionSchema.array()
})

export type Drone = z.infer<typeof DroneSchema>;

export interface MapDrone extends Drone {
  color: Color
}