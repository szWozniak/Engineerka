import { Color, Position } from "deck.gl"
import { z } from "zod"

const currentDroneSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  heading: z.number(),
  speed: z.number(),
  altitude: z.number(),
  country: z.string(),
  operater: z.string(),
  identification: z.number().min(1).max(16),
  identificationLabel: z.string(),
  model: z.string(),
  registrationNumber: z.string(),
  sign: z.string(),
  isAirbourne: z.boolean(),
  fuel: z.number()
})

export const currentDroneListSchema = z.array(currentDroneSchema)

export type CurrentDrones = z.infer<typeof currentDroneSchema>;

export interface Drone{
    id: number,
    position: Position
    orientation: [number, number, number]
  }

export interface MapDrone extends Drone{
    color: Color
}