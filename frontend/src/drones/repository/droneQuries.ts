
import { queryOptions, skipToken } from "@tanstack/react-query"
import { Filter } from "../../filters/types"
import { getAllDrones, getCurrentDrones, getDroneByRegistration, getDroneFlightSummariesByRegistration } from "../api/api"
import { FilterOptions } from "mapbox-gl"

const droneQueries = {
    currentDrones: (filters: Filter[]) => ["current-drones", JSON.stringify(filters)],
    getCurrentDrones: (filters: Filter[]) => queryOptions({
        queryKey: droneQueries.currentDrones(filters),
        queryFn: () => getCurrentDrones(filters),
        refetchInterval: 2000,
    }),

    allDrones: (filters: Filter[]) => ["all-drones", JSON.stringify(filters)],
    getAllDrones: (filters: Filter[]) => queryOptions({
        queryKey: droneQueries.allDrones(filters),
        queryFn: () => getAllDrones(filters),
        refetchInterval: 2000,
    }),

    selectedDrone: (registrationNumber: string | null) => ["selected-drone", registrationNumber],
    getSelectedDroneData: (regisrationNumber: string | null) => queryOptions({
        queryKey: droneQueries.selectedDrone(regisrationNumber),
        queryFn: regisrationNumber ? () => getDroneByRegistration(regisrationNumber) : skipToken,
        refetchInterval: 2000
    }),

    selectedDroneFlightsSummaries: (registrationNumber: string | null) => ["selected-drone-flights-summaries", registrationNumber],
    getSelectedDroneFlightsSummaries: (registrationNumber: string | null) => queryOptions({
        queryKey: droneQueries.selectedDroneFlightsSummaries(registrationNumber),
        queryFn: registrationNumber ? () => getDroneFlightSummariesByRegistration(registrationNumber) : skipToken
    })
}

export default droneQueries