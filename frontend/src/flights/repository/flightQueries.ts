import { queryOptions, skipToken } from "@tanstack/react-query"
import { getDroneFlightSummariesByRegistration, getFlightById } from "../api/api"
import { FlightFilter } from "../../filters/flights/types"

const flightQueries = {
    flight: (flightId: number | null) => ["flight", flightId],
    getFlight: (flightId: number | null) => queryOptions({
        queryKey: flightQueries.flight(flightId),
        queryFn: flightId ? () => getFlightById(flightId) : skipToken
    }),

    selectedDroneFlightsSummaries: (registrationNumber: string | null, filters: FlightFilter[]) =>
         ["selected-drone-flights-summaries", registrationNumber, JSON.stringify(filters)],
    getSelectedDroneFlightsSummaries: (registrationNumber: string | null, filters: FlightFilter[]) => queryOptions({
        queryKey: flightQueries.selectedDroneFlightsSummaries(registrationNumber, filters),
        queryFn: registrationNumber ? () => getDroneFlightSummariesByRegistration(registrationNumber, filters) : skipToken
    })
}

export default flightQueries