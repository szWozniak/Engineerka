import { Drones, currentDroneListSchema } from "../types";

const checkForErrors = (res: Response) => {
    if (res.status !== 200){
        throw res;
    }

    return res;
}

export const getCurrentDrones = (): Promise<Drones[]> => {
    return fetch("http://localhost:8000/drones", {
        method: "GET",
    })
    .then(checkForErrors)
    .then(r => r.json())
    .then(currentDroneListSchema.parse)
}