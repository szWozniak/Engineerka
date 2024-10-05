import { queryOptions, skipToken } from "@tanstack/react-query"
import { getFlightById } from "../api/api"

const flightQueries = {
    flight: (flightId: number | null) => ["flight", flightId],
    getFlight: (flightId: number | null) => queryOptions({
        queryKey: flightQueries.flight(flightId),
        queryFn: flightId ? () => getFlightById(flightId) : skipToken
    })
}

export default flightQueries