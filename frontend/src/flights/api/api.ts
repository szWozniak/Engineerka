import { checkForErrors, defaultURL } from "../../common/api/apiHelpers"
import { DroneFlight, DroneFlightSchema } from "./types"

export const getFlightById = (flightId: number): Promise<DroneFlight> => {
    return fetch(`${defaultURL}/flights/${flightId}`, {
      method: "GET",
    })
      .then(checkForErrors)
      .then(r => r.json())
      .then(DroneFlightSchema.parse)
  }
