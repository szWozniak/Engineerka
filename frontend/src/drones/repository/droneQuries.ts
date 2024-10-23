
import { queryOptions, skipToken } from "@tanstack/react-query"
import { DroneFilter } from "../../filters/drone/types"
import { getAllDrones, getCurrentDrones, getDroneByRegistration } from "../api/api"

const droneQueries = {
    currentDrones: (filters: DroneFilter[]) => ["current-drones", JSON.stringify(filters)],
    getCurrentDrones: (filters: DroneFilter[]) => queryOptions({
        queryKey: droneQueries.currentDrones(filters),
        queryFn: () => getCurrentDrones(filters),
        refetchInterval: 2000,
    }),

    allDrones: (filters: DroneFilter[]) => ["all-drones", JSON.stringify(filters)],
    getAllDrones: (filters: DroneFilter[]) => queryOptions({
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
}

export default droneQueries