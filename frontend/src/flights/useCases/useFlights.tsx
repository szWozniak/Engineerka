import { useContext } from "react"
import flightQueries from "../repository/flightQueries"
import { useQuery } from "@tanstack/react-query"
import { AppContext } from "../../context/AppContext"
import useFlightFilters from "../../filters/flights/useCases/useFlightFilters"
import useSorting from "../../sorting/useCases/useSorting";

const useFlights = () => {
    const { flights } = useContext(AppContext);
    const {sortingOptions} = useSorting();

    const {filters} = useFlightFilters();

    const {droneRegistrationToShowFlightsFor, setDroneRegistrationToShowFlightsFor} = flights

    const { data: trackedFlight } = useQuery(
        flightQueries.getFlight(flights.selectedFlightId)
    )

    const { data: flightsSummaries } = useQuery(
        flightQueries.getSelectedDroneFlightsSummaries(droneRegistrationToShowFlightsFor, filters, sortingOptions)
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