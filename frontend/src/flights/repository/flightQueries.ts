import { queryOptions, skipToken } from "@tanstack/react-query"
import { getDroneFlightSummariesByRegistration, getFlightById } from "../api/api"
import { FlightFilter } from "../../filters/flights/types"
import { SortingOptions } from "../../sorting/commonTypes"

const flightQueries = {
    flight: (flightId: number | null) => ["flight", flightId],
    getFlight: (flightId: number | null) => queryOptions({
        queryKey: flightQueries.flight(flightId),
        queryFn: flightId ? () => getFlightById(flightId) : skipToken
    }),

    selectedDroneFlightsSummaries: (registrationNumber: string | null, filters: FlightFilter[], sorting: SortingOptions) =>
         ["selected-drone-flights-summaries", registrationNumber, JSON.stringify(filters), JSON.stringify(sorting)],
    getSelectedDroneFlightsSummaries: (registrationNumber: string | null, filters: FlightFilter[], sorting: SortingOptions) => queryOptions({
        queryKey: flightQueries.selectedDroneFlightsSummaries(registrationNumber, filters, sorting),
        queryFn: registrationNumber ? () => getDroneFlightSummariesByRegistration(registrationNumber, filters, sorting) : skipToken
    })
}

export default flightQueries