import { LineLayer } from "deck.gl"
import { droneTrace } from "../types/lines"
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const useFlightsTracesLayer = () => {
  const { flights, table } = useContext(AppContext) //this table thing is strange

  const mapPositionsToTraces = (): droneTrace[] => {
    if (table.selectedDroneFlights === undefined) return [];

    const flightsToDisplay = flights.trackedFlight ? [{
      ...flights.trackedFlight,
      flightRecords: flights.trackedFlight.flightRecords.slice(0, flights.trackedPoint+1)
    }] : table.selectedDroneFlights
    const traces: droneTrace[] = [];

    flightsToDisplay.forEach((droneFlight, index) => {
      const trace = droneFlight?.flightRecords || []

      if (trace.length < 2) { return []}

      for (let i = 0; i < trace.length - 1; i++) {
        traces.push({
          id: droneFlight?.id,
          start: [trace[i].longitude, trace[i].latitude, trace[i].altitude],
          end: [trace[i + 1].longitude, trace[i + 1].latitude, trace[i + 1].altitude]
        })
      }
    });

    return traces;
  }

  return new LineLayer({
    id: 'flight-paths',
    data: mapPositionsToTraces(),
    opacity: 0.8,
    getSourcePosition: d => d.start,
    getTargetPosition: d => d.end,
    getColor: d => d.id === flights.highlitedFlightId ? [200, 255, 255, 200] : [0, 200, 200, 125],
    getWidth: _d => 5,
    pickable: false,
    visible: true,
  })
};

export default useFlightsTracesLayer;