import { CurrentDrones, currentDroneListSchema } from "../types";

const checkForErrors = (res: Response) => {
    if (res.status !== 200){
        throw res;
    }

    return res;
}

export const getCurrentDrones = (): Promise<CurrentDrones[]> => {
    return fetch("localhost:8000/drones", {
        method: "GET",
        headers:{
            "content-type": "application/json"
        }
    })
    .then(checkForErrors)
    .then(r => r.json())
    .then(currentDroneListSchema.parse)
}