import { checkForErrors, defaultURL } from "../../common/api/apiHelpers"
import { DroneFlight, DroneFlightSchema, DroneFlightSummary, DroneFlightSummarySchema } from "./types"

export const getFlightById = (flightId: number): Promise<DroneFlight> => {
    return fetch(`${defaultURL}/flights/${flightId}`, {
      method: "GET",
    })
      .then(checkForErrors)
      .then(r => r.json())
      .then(DroneFlightSchema.parse)
  }

export const getDroneFlightSummariesByRegistration = (registration: string): Promise<DroneFlightSummary[]> => {
  return fetch(`${defaultURL}/flights/${registration}`, {
    method: "GET",
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneFlightSummarySchema.array().parse)
}