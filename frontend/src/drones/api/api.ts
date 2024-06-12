import { defaultURL } from "../../common/api/apiHelpers";
import { Drone, DroneSchema } from "../types";

const checkForErrors = (res: Response) => {
    if (res.status !== 200){
        throw res;
    }

    return res;
}

export const getCurrentDrones = (): Promise<Drone[]> => {
    return fetch(`${defaultURL}drone`, {
        method: "GET",
    })
    .then(checkForErrors)
    .then(r => r.json())
    .then(DroneSchema.array().parse)
}