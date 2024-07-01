import { defaultURL } from "../../common/api/apiHelpers";
import { Drone, DroneSchema } from "../types";

const checkForErrors = (res: Response) => {
    if (res.status !== 200) {
        throw res;
    }

    return res;
}

export const getCurrentDrones = (): Promise<Drone[]> => {
    return fetch(`${defaultURL}drones`, {
        method: "GET",
    })
        .then(checkForErrors)
        .then(r => r.json())
        .then(DroneSchema.array().parse)
}

export const getDroneByRegistration = (registration: string): Promise<Drone> => {
    return fetch(`${defaultURL}drones/${registration}`, {
        method: "GET",
    })
        .then(checkForErrors)
        .then(r => r.json())
        .then(DroneSchema.parse)
}