import { Color, Position } from "deck.gl"
import { z } from "zod"

const DroneSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  heading: z.number(),
  speed: z.number(),
  altitude: z.number(),
  country: z.string(),
  operator: z.string(),
  identification: z.number().min(1).max(16),
  identificationLabel: z.string(),
  model: z.string(),
  registrationNumber: z.string(),
  sign: z.string(),
  isAirbourne: z.boolean(),
  fuel: z.number()
})

type Drone = z.infer<typeof DroneSchema>

export const currentDroneListSchema = z.array(DroneSchema)

export type Drones = z.infer<typeof DroneSchema>;

export interface RoboczyDrone{
    id: number,
    position: Position
    orientation: [number, number, number]
  }

export interface MapDrone extends Drone{
    color: Color
}