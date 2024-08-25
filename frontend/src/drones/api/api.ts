import { defaultURL } from "../../common/api/apiHelpers";
import { Filter } from "../../filters/types";
import { Drone, DroneSchema } from "../types";
import mapFilters from "./mappers";

const checkForErrors = (res: Response) => {
    if (res.status !== 200) {
        throw res;
    }

    return res;
}

export const getCurrentDrones = (filters: Filter[]): Promise<Drone[]> => {
    return fetch(`${defaultURL}/drones`, {
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
    return fetch(`${defaultURL}/drones/${registration}`, {
        method: "GET",
    })
        .then(checkForErrors)
        .then(r => r.json())
        .then(DroneSchema.parse)
}