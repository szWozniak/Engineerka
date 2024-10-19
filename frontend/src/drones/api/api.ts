import { checkForErrors, defaultURL } from "../../common/api/apiHelpers";
import { DroneFilter } from "../../filters/drone/types";
import { Drone, DroneBase, DroneBaseSchema, DroneFlightSummary, DroneFlightSummarySchema, DroneSchema, DronesWithTimestamp, DronesWithTimestampSchema } from "../types";
import mapFilters from "./mappers";

export const getAllDrones = (filters: DroneFilter[]): Promise<DroneBase[]> => {
  return fetch(`${defaultURL}/drones/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json" 
    },
    body: JSON.stringify(mapFilters(filters))
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneBaseSchema.array().parse) 
}

export const getCurrentDrones = (filters: DroneFilter[]): Promise<DronesWithTimestamp> => {
  return fetch(`${defaultURL}/drones/currentlyFlying`, {
    method: "POST",
    headers: {
      "Content-type": "application/json" 
    },
    body: JSON.stringify(mapFilters(filters))
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DronesWithTimestampSchema.parse)
}

export const getDroneByRegistration = (registration: string): Promise<Drone> => {
  return fetch(`${defaultURL}/drones/currentlyFlying/${registration}`, {
    method: "GET",
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneSchema.parse)
}
