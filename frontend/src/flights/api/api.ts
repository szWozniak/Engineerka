import { checkForErrors, defaultURL } from "../../common/api/apiHelpers"
import { FlightFilter } from "../../filters/flights/types"
import { SortingOptions } from "../../sorting/commonTypes"
import { DroneFlight, DroneFlightSchema, DroneFlightSummary, DroneFlightSummarySchema } from "../types"
import { mapFlightFilters, mapFlightSorting } from "./mappers"

export const getFlightById = (flightId: number): Promise<DroneFlight> => {
    return fetch(`${defaultURL}/flights/${flightId}`, {
      method: "GET",
    })
      .then(checkForErrors)
      .then(r => r.json())
      .then(DroneFlightSchema.parse)
  }

export const getDroneFlightSummariesByRegistration = (registration: string, filters: FlightFilter[], sorting: SortingOptions): Promise<DroneFlightSummary[]> => {
  console.log("SIPSKO", sorting)
  
  return fetch(`${defaultURL}/flights/${registration}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json" 
    },
    body: JSON.stringify({
      ...mapFlightFilters(filters),
      ...mapFlightSorting(sorting)
    })
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneFlightSummarySchema.array().parse)
}
