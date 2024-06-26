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

export const getDroneById = (id: number): Promise<Drone> => {
    return fetch(`${defaultURL}drones/${id}`, {
        method: "GET",
    })
        .then(checkForErrors)
        .then(r => r.json())
        .then(DroneSchema.parse)
}