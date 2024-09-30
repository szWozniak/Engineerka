import { useContext, useState } from "react"
import flightQueries from "../repository/flightQueries"
import { useQuery } from "@tanstack/react-query"
import droneQueries from "../../drones/repository/droneQuries"
import { AppContext } from "../../context/AppContext"

const useFlights = () => {
    const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null)

    const { flights } = useContext(AppContext);

    const {droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor} = flights

    const [trackedPoint, setTrackedPoint] = useState<number>(0)
    const [highlightedFlightId, setHighlightedFlightId] = useState<number | null>(null);

    const { data: trackedFlight } = useQuery(
        flightQueries.getFlight(selectedFlightId)
    )

    const { data: flightsSummaries } = useQuery(
        droneQueries.getSelectedDroneFlightsSummaries(droneRegistrationToShowFlightsFor)
    )

    return {
        flightsSummaries:{
            droneRegistrationToShowFlightsFor: droneRegistrationToShowFlightsFor,
            selectDroneRegistrationToShowFlightsFor: setDroneRegistrationToShowFlightsFor,
            flightsSummaries,
            highlightedFlightId,
            selectHighlightedFlightId: setHighlightedFlightId
        },
        detailedFlight:{
            trackedFlight,
            selectedFlightId,
            selectFlightId: setSelectedFlightId,
            trackedPoint,
            selectTrackedPoint: setTrackedPoint,
        }
    }
}

export default useFlights