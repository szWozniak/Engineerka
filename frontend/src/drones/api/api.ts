import { Drones, currentDroneListSchema } from "../types";

const checkForErrors = (res: Response) => {
    if (res.status !== 200){
        throw res;
    }

    return res;
}

export const getCurrentDrones = (): Promise<Drones[]> => {
    // return fetch("localhost:8000/drones", {
    //     method: "GET",
    //     headers:{
    //         "content-type": "application/json"
    //     }
    // })
    // .then(checkForErrors)
    // .then(r => r.json())
    // .then(currentDroneListSchema.parse)
    return new Promise<Drones[]>((res, rej) => {
        const body ={
            latitude: 50.0671,
            longitude: 19.9317,
            heading: 24,
            speed: 30,
            altitude: 50,
            country: "PL",
            operator: "PL",
            identification: 12,
            identificationLabel: "red",
            model: "Twojstary",
            registrationNumber: "Pijany",
            sign: "elo",
            isAirbourne: true,
            fuel: 2
          }
        return res([body])
    })
}