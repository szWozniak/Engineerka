import { FLIGHT_QA_API_URL } from "./constants"

export const thereIsAFlight = async () => {
    const response = await fetch(FLIGHT_QA_API_URL, {
        method: "POST"
    })

    if (response.status !== 200) {
        throw response;
    }
}