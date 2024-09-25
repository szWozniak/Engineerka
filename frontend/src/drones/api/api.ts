import { checkForErrors, defaultURL } from "../../common/api/apiHelpers";
import { Filter } from "../../filters/types";
import { Drone, DroneBase, DroneBaseSchema, DroneFlightSummary, DroneFlightSummarySchema, DroneSchema } from "../types";
import mapFilters from "./mappers";

export const getAllDrones = (filters: Filter[]): Promise<DroneBase[]> => {
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

export const getCurrentDrones = (filters: Filter[]): Promise<Drone[]> => {
  return fetch(`${defaultURL}/drones/currentlyFlying`, {
    method: "POST",
    headers: {
      "Content-type": "application/json" 
    },
    body: JSON.stringify(mapFilters(filters))
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneSchema.array().parse)
}

export const getDroneByRegistration = (registration: string): Promise<Drone> => {
  return fetch(`${defaultURL}/drones/currentlyFlying/${registration}`, {
    method: "GET",
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneSchema.parse)
}

export const getDroneFlightSummariesByRegistration = (registration: string): Promise<DroneFlightSummary[]> => {
  return fetch(`${defaultURL}/drones/${registration}/flights`, {
    method: "GET",
  })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneFlightSummarySchema.array().parse)
}
