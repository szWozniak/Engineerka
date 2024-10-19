import { queryOptions, skipToken } from "@tanstack/react-query"
import { getDroneFlightSummariesByRegistration, getFlightById } from "../api/api"

const flightQueries = {
    flight: (flightId: number | null) => ["flight", flightId],
    getFlight: (flightId: number | null) => queryOptions({
        queryKey: flightQueries.flight(flightId),
        queryFn: flightId ? () => getFlightById(flightId) : skipToken
    }),

    selectedDroneFlightsSummaries: (registrationNumber: string | null) => ["selected-drone-flights-summaries", registrationNumber],
    getSelectedDroneFlightsSummaries: (registrationNumber: string | null) => queryOptions({
        queryKey: flightQueries.selectedDroneFlightsSummaries(registrationNumber),
        queryFn: registrationNumber ? () => getDroneFlightSummariesByRegistration(registrationNumber) : skipToken
    })
}

export default flightQueries