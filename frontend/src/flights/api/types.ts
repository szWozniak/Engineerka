import { z } from "zod";

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