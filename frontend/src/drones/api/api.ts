import { checkForErrors, defaultURL } from "../../common/api/apiHelpers";
import { DroneFilter } from "../../filters/drone/types";
import { SortingOptions } from "../../sorting/commonTypes";
import { Drone, DroneBase, DroneBaseSchema, DroneSchema, DronesWithTimestamp, DronesWithTimestampSchema } from "../types";
import { mapDroneFilters, mapDroneSorting } from "./mappers";

export const getAllDrones = (filters: DroneFilter[], sorting: SortingOptions): Promise<DroneBase[]> => {
  return fetch(`${defaultURL}/drones/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json" 
    },
    body: JSON.stringify({
      ...mapDroneFilters(filters),
      ...mapDroneSorting(sorting)
    })
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
    body: JSON.stringify(mapDroneFilters(filters))
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
