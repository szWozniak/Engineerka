import { checkForErrors, defaultURL } from "../../common/api/apiHelpers"
import { FlightFilter } from "../../filters/flights/types"
import { DroneFlight, DroneFlightSchema, DroneFlightSummary, DroneFlightSummarySchema } from "../types"
import mapFlightFilters from "./mappers"

export const getFlightById = (flightId: number): Promise<DroneFlight> => {
    return fetch(`${defaultURL}/flights/${flightId}`, {
      method: "GET",
    })
      .then(checkForErrors)
      .then(r => r.json())
      .then(DroneFlightSchema.parse)
  }

export const getDroneFlightSummariesByRegistration = (registration: string, filters: FlightFilter[]): Promise<DroneFlightSummary[]> => {
  return fetch(`${defaultURL}/flights/${registration}`, {
    method: "POST",
    body: JSON.stringify(mapFlightFilters(filters))
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneFlightSummarySchema.array().parse)
}
