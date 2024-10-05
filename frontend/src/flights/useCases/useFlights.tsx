import { useContext, useState } from "react"
import flightQueries from "../repository/flightQueries"
import { useQuery } from "@tanstack/react-query"
import droneQueries from "../../drones/repository/droneQuries"
import { AppContext } from "../../context/AppContext"

const useFlights = () => {
    const { flights } = useContext(AppContext);

    const {droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor} = flights

    const { data: trackedFlight } = useQuery(
        flightQueries.getFlight(flights.selectedFlightId)
    )

    const { data: flightsSummaries } = useQuery(
        droneQueries.getSelectedDroneFlightsSummaries(droneRegistrationToShowFlightsFor)
    )

    return {
        flightsSummaries:{
            droneRegistrationToShowFlightsFor: droneRegistrationToShowFlightsFor,
            selectDroneRegistrationToShowFlightsFor: setDroneRegistrationToShowFlightsFor,
            flightsSummaries,
            highlightedFlightId: flights.highlightedFlightId,
            selectHighlightedFlightId: flights.setHighlightedFlightId
        },
        detailedFlight:{
            trackedFlight,
            selectFlightId: flights.setSelectedFlightId,
            trackedPoint: flights.trackedPoint,
            selectTrackedPoint: flights.setTrackedPoint,
        }
    }
}

export default useFlights